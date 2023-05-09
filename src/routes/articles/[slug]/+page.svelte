<script lang="ts">
  import type { Article, Preview } from "../../../lib/server/firebase";
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
      <h1 class="font-bold text-5xl capitalize">
        {data.article?.title.replace(/-/g, " ")}
      </h1>
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
      <p class="text-sm">{data.article?.date}</p>
    </div>
    <div class="text mt-10">
      {@html data.article?.text}
    </div>
  </div>
</div>

<style>
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
