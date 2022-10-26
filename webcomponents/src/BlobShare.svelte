<svelte:options tag="blob-share" />

<script>
import { onMount } from "svelte";

import { when } from "./helpers";

export let baseurl = "";
export let title = "";
export let maxlength = false;

export let tags = "";
export let places = "";
// export let blob = "";

export let theme = "light";

export let sidebar = "true";

export let external_style = "";

let mounted = false;
let items = [];

function update() {
  if (!mounted) return;
  
  const params = []
  if (maxlength) {
    params.push(`max=${maxlength}`);
  }
  
  // if (blob) {
    fetch(`${baseurl}/api/post/93`)
    .then((res) => res.json())
    .then((e) => {
      items = e
    })
    .catch((e) => {
      console.error("Error loading Blob API -> ", e)
    })
  }
  
  onMount(() => {
    mounted = true
    update()
  })
  
  $: update(
    maxlength && title && places && tags && theme && show_recurrent && sidebar
  );
  </script>
  
  {#if external_style}<link rel="stylesheet" href={external_style} />{/if}
  {#if items.length}
  <div
  id="blobShare"
  class:dark={theme === "dark"}
  class:light={theme === "light"}
  class:sidebar={sidebar === "true"}
  class:nosidebar={sidebar !== "true"}
  >
  {#if title && sidebar === "true"}
  <a href={baseurl} target="_blank" id="header">
    <div class="content">
      <div class="title">{title}</div>
      <img id="logo" alt="logo" src="{baseurl}/logo.png" />
    </div>
  </a>
  {/if}
  {#each items as item}
  <a
  href="{baseurl}/item/{item.slug || item.id}"
  class="item"
  title={item.title}
  target="_blank"
  >
  {#if sidebar !== "true"}
  <div class="img">
    {#if item.image}
    <img src={item.image} loading="lazy" />
    {:else}
    <img
    style="aspect-ratio=1.7778;"
    alt={item.title}
    src={baseurl + "/noimg.svg"}
    loading="lazy"
    />
    {/if}
  </div>
  {/if}
  <div class="content">
    <div class="subtitle">
      {when(item)}
    </div>
    <div class="title">
      {item.title}
    </div>
    {#if item.tags.length}
    <div class="tags">
      {#each item.tags as tag}
      <span class="tag">#{tag.name}</span>
      {/each}
    </div>
    {/if}
  </div>
</a>
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
  }
  
  .nosidebar {
    max-width: 1200px;
  }
  
  #header {
    padding: 1.2rem 1rem;
    background-color: var(--bg-odd-color);
  }
  
  .sidebar {
    max-width: 500px;
    box-shadow: rgba(60, 64, 67, 0.4) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.25) 0px 1px 3px 1px;
    border-radius: 5px;
    font-size: 1rem;
  }
  
  .item .img {
    width: 100%;
    max-width: 450px;
    max-height: 250px;
    aspect-ratio: 1.7778;
    flex: 1 0 auto;
    /* height: 100%; */
  }
  
  @media screen and (max-width: 800px) {
    .item {
      flex-wrap: wrap;
    }
    .item .img {
      max-width: 100%;
    }
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
  
  .tags {
    margin-top: 2px;
  }
  
  #logo {
    position: absolute;
    top: 10px;
    right: 10px;
    height: 40px;
  }
  
  a {
    text-decoration: none;
    color: var(--text-color);
    display: flex;
    padding: 8px 20px;
    margin: 0;
    line-height: 1.275rem;
    font-weight: 400;
    font-size: 0.875rem;
    position: relative;
    transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1),
    padding 0.3s;
    box-sizing: content-box;
  }
  
  a:hover .title,
  a:focus .title,
  a:active .title {
    text-decoration: underline;
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
  .sidebar a {
    background-color: var(--bg-even-color);
    border-bottom: 1px solid var(--line-color);
  }
  
  .sidebar a:hover,
  .sidebar a:focus,
  .sidebar a:active {
    background-color: var(--bg-hover-color);
    padding-left: 15px;
    padding-right: 25px;
  }
  
  .place {
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 1.4rem;
    color: orangered;
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
    font-size: 1rem;
    line-height: 1.1em;
    color: var(--title-color);
    opacity: 0.9;
  }
  
  .tag {
    margin-right: 10px;
    display: inline-block;
  }
</style>
