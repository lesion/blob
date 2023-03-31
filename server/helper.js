// const iconv = require('iconv-lite')
import iconv from 'iconv-lite'
import FeedParser from 'feedparser'
import { parseHTML } from 'linkedom'
import fetch from 'node-fetch'
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window)

export function getParams(str) {
  const params = str.split(';').reduce((params, param) => {
    const parts = param.split('=').map(part => part.trim())
    if (parts.length === 2) {
      params[parts[0]] = parts[1]
    }
    return params
  }, {})
  return params
}

DOMPurify.addHook('beforeSanitizeElements', node => {

  if (node.hasAttribute && node.hasAttribute('href')) {
    const href = node.getAttribute('href')
    const text = node.textContent

    // remove FB tracking param
    if (href.includes('fbclid=')) {
      try {
        const url = new URL.URL(href)
        url.searchParams.delete('fbclid')
        node.setAttribute('href', url.href)
        if (text.includes('fbclid=')) {
          node.textContent = url.href
        }
      } catch (e) {
        return node
      }
    }
  }
  return node
})

export function parseContent(html) {

  const saneHTML = DOMPurify.sanitize(html, {
    CUSTOM_ELEMENT_HANDLING: {
      tagNameCheck: /^(gancio-.*|display-feed)/,
      attributeNameCheck: /(feed|id|theme)/,
      allowCustomizedBuiltInElements: true, // allow customized built-ins
    },
    ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'br', 'i', 'span', 'img', 'figure', 'picture', 'audio', 'iframe',
      'h6', 'b', 'a', 'li', 'ul', 'ol', 'code', 'blockquote', 'u', 's', 'strong'],
    ALLOWED_ATTR: ['href', 'target', 'src']
  })
  // const images = window.document.getElementsByTagName('img')
  const { document } = new JSDOM(html).window

  const img = document.querySelector('img[src]')
  let image
  if (img) {
    image = img.getAttribute('src')
  }

  return { html: saneHTML, image }

}

export function maybeTranslate(res, charset) {
  let iconvStream
  // Decode using iconv-lite if its not utf8 already.
  if (!iconvStream && charset && !/utf-*8/i.test(charset)) {
    try {
      iconvStream = iconv.decodeStream(charset)
      console.log('Converting from charset %s to utf-8', charset)
      // iconvStream.on('error', done)
      // If we're using iconvStream, stream will be the output of iconvStream
      // otherwise it will remain the output of request
      res = res.pipe(iconvStream)
    } catch (err) {
      res.emit('error', err)
    }
  }
  return res
}

/**
 * @param {*} URL 
 * @description Check if URL is a valid atom/rss feed or in case it's an html search for a public feed
 *              then retrieve feed detailed information
 * @returns     An object with feed information (title, url)
 * 
 * dato un link devo:
 * - fare richiesta con content-type xml / rss poi html / jsonfeed
 * - se ritorna un html cerco se espone un feed cercando link[rel=alternate]
 * - se non lo trovo cerco path comuni
 * - se non trovo niente
 */
export async function getFeedDetails(u) {
  const url = new URL(u)
  // Get a response stream
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
  const res = await fetch(url.href,
    {
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
      'accept': 'application/rss+xml, text/html'
    })

  // Handle our response and pipe it to feedparser
  if (res.status !== 200) throw new Error(`Bad status code ${res.status} (${u})`)

  const contentType = res.headers.get('content-type')
  if (contentType.includes('html')) {
    const { document } = parseHTML(await res.text())
    const links = document.querySelectorAll('link[rel=alternate]')
    const feeds = []
    links.forEach(link => {
      const type = link.getAttribute('type')
      const href = link.getAttribute('href').startsWith('/') ? url.origin + link.getAttribute('href') : link.getAttribute('href')
      if (type && href) {
        feeds[type] = feeds[type] || href // could be relative!
      }
    })
    if (feeds['application/atom+xml']) {
      return getFeedDetails(feeds['application/atom+xml'])
    } else if (feeds['application/rss+xml']) {
      return getFeedDetails(feeds['application/rss+xml'])
    } else {
      throw new Error(`No feed found for ${url.href}`)
    }
  }

  // feedparser.on('error', e => manager.sourceError(e, source))
  // feedparser.on('end', e => manager.sourceCompleted(source))
  return new Promise((resolve, reject) => {
    const feedparser = new FeedParser()
    feedparser.on('readable', () => {
      // console.error('sono dentro readable!', feedparser.read())
      feedparser.meta.URL = url.href
      return resolve(feedparser.meta)
    })
    feedparser.on('error', reject)
    feedparser.on('end', resolve)
    // Handle our response and pipe it to feedparser
    const charset = getParams(res.headers.get('content-type') || '').charset || 'utf-8'
    let responseStream = maybeTranslate(res.body, charset)

    // And boom goes the dynamite
    responseStream.pipe(feedparser)
  })

}

// module.exports = { getParams, getFeedDetails, maybeTranslate }
