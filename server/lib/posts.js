import prisma from './db.js'

export async function addPost(post) {

  const ret = await prisma.post.create({
    data: {
      date: post.date || undefined,
      title: post.title || undefined,
      summary: post.description,
      content: post.description,
      URL: post.url,
      image: post.image
    }
  }).catch(e => {
    console.error(e)
  })
  console.error(ret)
  return ret
}

export function getLastPosts(after) {
  let where = {}
  if (after) {
    where = { date: { lt: new Date(after) } }
  }
  return prisma.post.findMany({
    where,
    take: 10,
    select: { id: true, image:true, title: true, date: true, summary: true, tags: true, URL: true, source: { select: { name: true, id: true } } },
    orderBy: { date: 'desc' },
  })
}

// assign a post to relative blobs based on filters
export async function assignPost(post) {
// transaction
// remove this post every blob
// 
// commit
}


// re-calculate blob content
export async function reassignBlob(blob) {
  // transaction

  // remove all posts from blob

  // get which posts matches blob filters

  // commit
}

export function getLastBlobPosts(blob, after) {

  // OK THIS IS AN HACK!
  const filters = blob.Filter.map(filter => {
    let f = `p.sourceId in (${filter.sources.map(s => s.id)}) `
    if (filter.tags?.length) {
      if (filter.inclusive) {
        f += `AND SUM(pt.B in (${filter.tags.map(t => t.id)})) = ${filter.tags.length}`
      } else {
        f += `AND SUM(pt.B in (${filter.tags.map(t => t.id)}))`
      }
    }
    return f
  }).join(' OR ')

  const q = `SELECT p.id, title, p.URL, summary, date, sourceId, s.name, link, description, p.image, GROUP_CONCAT(t.name) tags_name, GROUP_CONCAT(t.id) tags_id FROM Post p
    LEFT JOIN _PostToTag pt on pt.A=p.id
    LEFT JOIN Source s on s.id=p.sourceId
    LEFT JOIN Tag t on t.id=pt.B
    ${after ? 'WHERE date < "' + after + '"' : ''}
    GROUP BY p.id
    HAVING ${filters} ORDER BY date desc LIMIT 10`
  console.error(q)
  return prisma.$queryRawUnsafe(q)

}

// export function search (query) {

// }
