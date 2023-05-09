<script lang="ts">
  import type { Article, Preview } from "../../lib/server/firebase";
  export let data;
  let colors = [
    "#72ddf7",
    "#8093f1",
    "#f7aef8",
    "#fdc5f5",
    "#a0ced9",
    "#ab87ff",
    "#c18cf9",
    "#bc98ff",
  ];
  let colors2 = ["ff92b1"];
  let programming = [
    "rust",
    "c",
    "c++",
    "python",
    "java",
    "javascript",
    "typescritp",
    "ruby",
    "php",
    "sql",
    "bash",
    "asm",
  ];
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
        <div class="article overflow-hidden flex">
          <a href={"/articles/" + d.title} class="flex items-center">
            <div class="img">
              <img src={d.img} alt="article" />
            </div>
            <div class="data flex flex-col gap-2">
              <div class="title flex flex-col justify-center gap-3 -mt-5">
                <p class="font-bold text-2xl ml-5 capitalize hover:underline">
                  {d.title.replace(/-/g, " ")}
                </p>
                <div
                  class="date text-xs flex flex-col justify-center ml-5 -mt-2"
                >
                  {#if programming.includes(d.topic)}
                    <span
                      class="topic"
                      style={"background-color: " +
                        colors[Math.floor(Math.random() * colors.length)] +
                        ";"}>{d.topic}</span
                    >
                  {:else}
                    <span
                      class="topic"
                      style={"background-color: " +
                        colors[Math.floor(Math.random() * colors2.length)] +
                        ";"}>{d.topic}</span
                    >
                  {/if}
                  <p>{d.date}</p>
                </div>
              </div>
              {#if d.preview.length > 100}
                <div class="desc flex">
                  <p
                    class="text-sm ml-5 mt-2 capitalize break-all break-words mr-10"
                  >
                    {@html d.preview.substring(0, 180) +
                      `<span>&nbsp; &nbsp;&nbsp;</span><span class="font-bold hover:underline">Read more...</span>`}
                  </p>
                </div>
              {:else}
                <div class="desc flex">
                  <p
                    class="text-sm ml-5 mt-2 capitalize break-all break-words mr-10"
                  >
                    {@html d.preview +
                      `<span></span><span class="font-bold hover:underline">Read more...</span>`}
                  </p>
                </div>
              {/if}
            </div>
          </a>
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
  .topic {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    font-weight: bold;
    color: #1c1c1c;
    width: 50px;
    margin-bottom: 5px;
  }
  .img {
    position: relative;
    max-width: 200px;
    aspect-ratio: 16/14;
    overflow: hidden;
    border-radius: 5px;
  }
  img {
    position: relative;
    height: 100%;
    width: 100%;
    transition: 0.4s;
  }

  img:hover {
    transform: scaleY(1.05);
    transition: 0.4s;
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
  .article {
    background-color: #1c1c1c;
    margin-top: 30px;
    width: 800px;
    height: 180px;
    border-radius: 5px;
    transition: 0.3s;
  }
  .article:hover {
    background-color: #333333;
    transition: 0.3s;
  }
</style>
