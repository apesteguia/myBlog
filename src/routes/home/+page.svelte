<script lang="ts">
  import type { Article, Preview } from "../../lib/server/firebase";
  export let data;
</script>

<div class="app flex flex-col items-center">
  <div class="content mt-20 flex flex-col items-center">
    <div class="logo">
      <h1>Become a better Tech user</h1>
      <p class="mt-5">
        In this blog you can learn useful Linux tips, discover applications,
        explore new distros and stay updated with the latest from Linux and tech
        world
      </p>
    </div>
    <div class="content mt-10">
      <h2>Latest</h2>
      {#each data.articlesPreview as d}
        <div class="article">
          <h1 class="font-bold text-xl">{d.title}</h1>
          <p>{@html d.preview}</p>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;900&display=swap");
  .app {
    color: var(--color2);
    margin: auto;
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .article {
    margin-top: 30px;
    background-color: #1c1c1c;
    width: 800px;
    height: 100px;
    border-radius: 5px;
  }
  .content {
    width: 800px;
  }
  .content > h2 {
    font-size: 1.4rem;
    font-weight: bold;
  }
  .logo {
    margin-top: 30px;
    position: relative;
    width: 100%;
  }
  .logo > h1 {
    font-size: 3rem;
    font-weight: bold;
  }
  .logo > p {
    max-width: 500px;
    font-size: 1.1rem;
    color: rgb(207, 207, 207);
    word-wrap: break-word;
  }
  h1 {
    color: white;
  }
</style>
