<svelte:options tag="blob-share" />

<script>
  import { onMount } from "svelte"
  import { when } from "./helpers"

  export let baseurl = ""
  export let title = ""
  export let maxlength = false

  export let blob = 4

  export let dark = null
  export let sidebar = null

  export let external_style = "";

  let mounted = false;
  let items = [];

  function update() {
    if (!mounted) return;

    const params = [];
    if (maxlength) {
      params.push(`max=${maxlength}`);
    }

    // if (blob) {
    fetch(`${baseurl}/api/post/${blob}`)
      .then((res) => res.json())
      .then((e) => {
        items = e;
      })
      .catch((e) => {
        console.error("Error loading Blob API -> ", e);
      });
  }

  onMount(() => {
    mounted = true
    update()
  })

  // update post on blob change
  $: update( blob )
</script>

{#if external_style}<link rel="stylesheet" href={external_style} />{/if}
{dark} -  {sidebar} {typeof sidebar}
{#if items.length}
  <div
    id="blobShare"
    class:dark={dark}
    class:light={!dark}
    class:sidebar={sidebar}
    class:nosidebar={!sidebar}
  >
    {#if title && sidebar}{title}{/if}
    {#each items as item}
      <div class='item'>
      {#if !sidebar}
        <a
          href="{baseurl}/item/{item.slug || item.id}"
          title={item.title}
          target="_blank">
          <div class="img">
            <img
              style="aspect-ratio=1.7778;"
              alt={item.title}
              src={item.image ? item.image : baseurl + "/noimg.svg"}
              loading="lazy"/>
          </div>
        </a>
      {/if}
      <div class='content'>
        <div class="subtitle">
          {when(item.date)}
        </div>
        <a class="title" href='{item.URL}'>{item.title}</a>
        {#if item.tags.length}
          <div class="tags">
            {#each item.tags as tag}
              <span class="tag">{tag.name}</span>
            {/each}
          </div>
        {/if}
      </div>
    </div>
    {/each}
  </div>
{/if}

<style>
  #blobShare {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
    overflow-x: hidden;
    width: 100%;
    box-sizing: content-box;
    margin: 0 auto;
    font-size: 1rem;
    text-align: left;
    background-color: var(--bg-even-color);
  }

  .nosidebar {
    max-width: 1200px;
  }

  .sidebar {
    max-width: 500px;
    box-shadow: rgba(60, 64, 67, 0.4) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.25) 0px 1px 3px 1px;
    border-radius: 5px;
    font-size: 1rem;
  }

  .item {
    display: flex;
    gap: 0.2rem;
    padding: 0.5rem;
  }

  .sidebar .item {
    flex-wrap: wrap;
  }

  .item .img {
    width: 450px;
    max-height: 250px;
    aspect-ratio: 1.7778;
    flex: 1 0 auto;
    /* height: 100%; */
  }

  .item img {
    object-fit: cover;
    border-radius: 15px;
    width: 100%;
    height: 100%;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  }

  .nosidebar .item {
    margin-bottom: 2rem;
  }

  .nosidebar .content {
    margin-left: 1rem;
    margin-top: 5px;
    text-align: left;
  }

  .sidebar .content {
    flex-grow: 1;
  }

  .tags {
    margin-top: 2px;
  }

  a {
    text-decoration: none;
    color: var(--text-color);
    margin: 0;
    line-height: 1.275rem;
    font-weight: 400;
    font-size: 0.875rem;
    position: relative;
    transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), padding 0.3s;
    box-sizing: content-box;
    display: block;
  }

  .dark {
    --bg-odd-color: #161616;
    --bg-even-color: #222;
    --bg-hover-color: #333;
    --text-color: white;
    --title-color: white;
    --line-color: rgba(120, 120, 120, 0.2);
  }

  .light {
    --bg-odd-color: #f5f5f5;
    --bg-even-color: #fafafa;
    --bg-hover-color: #eee;
    --text-color: #222;
    --title-color: black;
    --line-color: rgba(220, 220, 220, 0.9);
  }

  .sidebar .item {
    padding: 1rem;
    border-bottom: 1px solid var(--line-color);
  }

  .sidebar .item:hover,
  .sidebar .item:focus,
  .sidebar .item:active {
    background-color: var(--bg-hover-color);
  }

  .title {
    color: var(--title-color);
    font-weight: bold;
    font-size: 1.3rem;
    line-height: 1.1em;
  }

  .nosidebar .title {
    font-size: 1.9em;
    line-height: 1.1em;
  }

  .subtitle {
    font-size: 0.9rem;
    line-height: 1.1em;
    color: var(--title-color);
    opacity: 0.9;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
    justify-items: left;
  }

  .tag {
    display: inline-block;
    border: 1px solid orangered;
    background-color: #ff9999;
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 0.8rem;
  }
</style>
