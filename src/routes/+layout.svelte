<script lang="ts">
  import { head_selector } from "svelte/internal";
  import "../app.postcss";
  import Icon from "@iconify/svelte";
  import type { Preview } from "../lib/server/firebase";

  export let data;

  let input: boolean = false;
  let busqueda: string = "";

  const setInput = (): void => {
    input = !input;
    resetearBusqueda();
  };
  const resetearBusqueda = (): void => {
    busqueda = "";
  };
</script>

<div class="navbar w-full flex items-center justify-center gap-8">
  <a href="/home" class="font-bold text-3xl">My blog</a>
  <hr />
  <hr />

  <a class:ocultar={input === true} href="/">News</a>
  <a class:ocultar={input === true} href="/">Linux</a>
  <a class:ocultar={input === true} href="/">How to</a>
  <a class:ocultar={input === true} href="/">About</a>
  <hr />
  <hr />

  {#if !input}
    <button class="icon" on:click={setInput}>
      <Icon icon="material-symbols:search-rounded" />
    </button>
  {:else}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      bind:value={busqueda}
      autofocus
      type="text"
      placeholder="Find articles"
    />
    {#if busqueda !== ""}
      <button class="icon close" on:click={resetearBusqueda}
        ><Icon icon="material-symbols:close" /></button
      >
      <div class="resultados">
        {#each data.articlesPreview.filter((a) => a.title
              .replace(/-/g, " ")
              .includes(busqueda) || a.preview.includes(busqueda)) as d}
          <a on:click={setInput} href={"/articles/" + d.title} class="res">
            <p class=" text-lg capitalize ml-2">
              {@html d.title
                .replace(/-/g, " ")
                .replace(
                  new RegExp(busqueda, "gi"),
                  (match) => `<b>${match}</b>`
                )}
            </p>
            <p class="ml-5">
              {@html d.preview
                .replace(
                  new RegExp(busqueda, "gi"),
                  (match) => `<b>${match}</b>`
                )
                .substring(0, 40)}
            </p>
          </a>
        {/each}
      </div>
    {/if}
    <button class="icon" on:click={setInput}
      ><Icon icon="material-symbols:close" /></button
    >
  {/if}
  <hr />
  <button>Contact me!</button>
</div>
<slot />

<style>
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;900&display=swap");
  .navbar {
    position: fixed;
    border-bottom: 1px solid #353535;
    height: 55px;
    z-index: 8;
  }
  .resultados {
    width: 380px;
    margin-left: -10px;
    border-radius: 5px;
    background-color: #1c1c1c;
    z-index: 10;
    position: absolute;
    top: 60px;
    border: 1px solid grey;
    overflow: hidden;
  }
  .ocultar {
    cursor: none;
    visibility: hidden;
  }
  .res {
    height: 80px;
    display: flex;
    border-bottom: 1px solid grey;
    flex-direction: column;
    word-break: break-all;
    justify-content: center;
    transition: 0.3s;
  }
  .res:hover {
    background-color: #353535;
    transition: 0.3s;
  }
  input {
    height: 40px;
    width: 380px;
    margin-right: 10px;
    z-index: 9;
    position: absolute;
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    width: 30px;
    height: 30px;
    font-size: 1.8rem;
    border-radius: 999px;
  }
  .close {
    font-size: 1rem;
    position: absolute;
    z-index: 9;
    width: 20px;
    height: 20px;
    margin-left: 300px;
  }
  button {
    width: 120px;
  }
  a {
    height: 55px;
    display: flex;
    align-items: center;
    transition: 0.3s;
  }
  a:hover {
    border-bottom: 1px solid white;
  }
</style>
