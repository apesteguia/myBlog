<script lang="ts">
  import { enhance } from "$app/forms";
  import { onMount } from "svelte";
  import type { Article, Preview } from "../../../lib/server/firebase";
  import Icon from "@iconify/svelte";
  export let data;

  interface ProgrammingMap {
    [key: string]: string;
  }

  onMount(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        like = !like;
      }
    });
  });

  const programming: ProgrammingMap = {
    Linux: "#72ddf7",
    linux: "#72ddf7",
    rust: "#ff686b",
    c: "#7161ef",
    python: "#7371fc",
    java: "#B07219",
    javascript: "#e9ff70",
    typescript: "#5aa9e6",
    bash: "#aaf683",
  };

  let like: boolean = typeof data.user === "string" ? true : false;
  const setLike = () => {
    like = !like;
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="app">
  {#if like}
    <div class="like">
      <h1 class="font-bold text-xl">To coment you have to be Logged In</h1>
      <a class="w-40" href="/login"><button class="w-40">Log In</button></a>
    </div>
  {/if}
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
            <form use:enhance method="POST" action="?/delete">
              <input
                class="hidden"
                name="delete"
                bind:value={data.article.title}
                type="text"
              />
              <button class="delete flex items-center justify-center w-10"
                ><a style="w-full border: none;" href="/edit"
                  ><Icon icon="ph:trash-fill" /></a
                ></button
              >
            </form>
          </div>
        </div>
      {/if}
      <h2 class="capitalize">{data.article?.desc}.</h2>
    </div>
    <div class="data mt-4">
      <span
        class="topic"
        style={"background-color: " +
          programming[data.article.topic] +
          ";" +
          "width: " +
          data.article.topic.length * 12 +
          "px;" +
          "min-width: 25px;"}>{data.article.topic}</span
      >

      <p class="text-sm">{new Date(data.article?.date)}</p>
    </div>
    <div class="text mt-10">
      {@html data.article?.text}
    </div>
    <h1 class="mt-20 font-bold text-3xl">Comments</h1>
    <form
      use:enhance
      action="?/Comment"
      method="POST"
      class="mt-10 flex flex-col gap-5"
    >
      <div class="card flex flex-col gap-3">
        <p>User</p>
        <input
          name="user"
          type="text"
          maxlength="50"
          placeholder="Type your email "
        />
      </div>
      <div class="card flex flex-col gap-3">
        <p>Comment</p>
        <textarea name="comment" id="" cols="30" rows="10" />
      </div>
      <button>Comment</button>
    </form>
    <div class="comments mt-10">
      {#each data.comments as d}
        <div class="comment mb-10">
          <div class="flex gap-5 items-center">
            <p class="text-lg ml-5 mt-2 font-bold">{d.user}</p>
            <div class="likes mt-2 gap-2 flex items-center">
              {#if !like}
                <button on:click={setLike} class="icon"
                  ><Icon icon="mdi:cards-heart-outline" /></button
                >
              {:else}
                <button class="icon"
                  ><Icon icon="mdi:cards-heart-outline" /></button
                >
              {/if}
              <p class=" flex items-center gap-1">
                {d.likes}
              </p>
            </div>
          </div>
          <p class="ml-5 text-xs">{d.date}</p>
          <p class="ml-5 mt-5 mr-5">{d.comment}</p>
          <br />
        </div>
      {/each}
    </div>
    <div class="hol h-56" />
  </div>
</div>

<style>
  .comment {
    border-radius: 5px;
    background-color: #1c1c1c;
    min-height: 120px;
    word-break: break-all;
  }
  .icon {
    border: none;
  }
  .icon:hover {
    background-color: transparent;
    outline: none;
    border: none;
    color: red;
  }
  .icon:focus {
    color: red;
    background-color: transparent;
    outline: none;
    border: none;
  }
  .delete {
    border: 1px solid red;
  }
  .delete:hover {
    color: black;
    background-color: red;
  }
  .like {
    position: fixed;
    top: 200px;
    background-color: var(--background);
    border: 1px solid grey;
    border-radius: 5px;
    z-index: 10;
    left: 40%;
    z-index: 9;
    height: 200px;
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
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
    background-color: gray;
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
