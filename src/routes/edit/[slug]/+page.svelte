<script lang="ts">
  import { enhance } from "$app/forms";
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
      <h1 class="font-bold text-5xl capitalize">
        {data.article?.title.replace(/-/g, " ")}
      </h1>
    </div>
    <form method="POST" use:enhance action="" class="create">
      <h1 class="font-bold text-3xl">Edit article</h1>
      <div class="carta">
        <p>Title</p>
        <input
          bind:value={data.article.title}
          name="title"
          type="text"
          placeholder="Title of the article"
          maxlength="20"
          required
        />
      </div>
      <div class="carta">
        <p>Preview</p>
        <input
          bind:value={data.article.desc}
          name="preview"
          type="text"
          placeholder="Title of the article"
          maxlength="20"
          required
        />
      </div>
      <div class="carta">
        <p>Topic</p>
        <input
          bind:value={data.article.topic}
          placeholder="Short topic"
          type="text"
          class="capitalize"
          maxlength="12"
          name="topic"
          required
        />
      </div>

      <div class="carta">
        <p>Image of the article</p>
        <input
          bind:value={data.article.img}
          name="img"
          type="text"
          placeholder="url of the img"
        />
      </div>
      <div class="carta">
        <p>Description</p>
        <textarea
          bind:value={data.article.desc}
          name="desc"
          id=""
          cols="10"
          rows="8"
          placeholder="Full description of the article"
          required
        />
      </div>
      <div class="carta">
        <p>Full article</p>
        <textarea
          bind:value={data.article.text}
          name="text"
          id="a"
          cols="30"
          rows="15"
        />
      </div>

      <div class="but"><button>Edit</button></div>
      <div class="space h-24" />
    </form>
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
  .create {
    margin-top: 40px;
  }
  .article {
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    width: 800px;
  }
  form {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    width: 800px;
  }
  .carta {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  #a {
    text-indent: 0px;
  }
  input {
    width: 100%;
  }
  .but {
    display: flex;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
  }
  .but > button {
    width: 100px;
  }
</style>
