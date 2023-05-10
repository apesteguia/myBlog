<script lang="ts">
  import type { Article, Preview } from "../../../lib/server/firebase";
  import Icon from "@iconify/svelte";
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
</script>

<div class="app">
  <div class="article">
    <div class="title flex flex-col gap-5 break-all break-words mr-10">
      {#if data.user === undefined}
        <h1 class="font-bold text-5xl capitalize">
          {data.article?.title.replace(/-/g, " ")}
        </h1>
      {:else}
        <div class="edit flex items-center gap-16">
          <h1 class="font-bold text-5xl capitalize">
            {data.article?.title.replace(/-/g, " ")}
          </h1>
          <div class="controls flex gap-5">
            <button class="flex items-center justify-center w-20"
              ><a
                style="w-full border: none;"
                href={"/edit/" + data.article.title}>Edit</a
              ></button
            >
            <button class="delete flex items-center justify-center w-10"
              ><a style="w-full border: none;" href="/edit"
                ><Icon icon="ph:trash-fill" /></a
              ></button
            >
          </div>
        </div>
      {/if}
      <h2 class="capitalize">{data.article?.desc}.</h2>
    </div>
    <div class="data mt-4">
      <p
        class="text-sm topic"
        style={"background-color: " +
          colors[Math.floor(Math.random() * colors.length)] +
          ";"}
      >
        {data.article?.topic}
      </p>
      <p class="text-sm">{new Date(data.article?.date)}</p>
    </div>
    <div class="text mt-10">
      {@html data.article?.text}
    </div>
  </div>
</div>

<style>
  .delete {
    border: 1px solid red;
  }
  .delete:hover {
    color: black;
    background-color: red;
  }
  .delete:focus {
    color: black;
    background-color: red;
  }
  .app {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h3 {
    font-size: 2rem;
    font-weight: bold;
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
  .article {
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    width: 800px;
  }
  h2 {
    color: rgb(180, 180, 180);
  }
</style>
