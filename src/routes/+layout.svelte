<script lang="ts">
  import { head_selector } from "svelte/internal";
  import "../app.postcss";
  import Icon from "@iconify/svelte";
  import type { Preview } from "../lib/server/firebase";
  import { enhance } from "$app/forms";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  export let data;

  let input: boolean = false;
  let busqueda: string = "";

  onMount(async () => {
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "x") {
        input = !input;
      }
      if (e.key === "Escape") {
        input = false;
      }
    });
    let localData = localStorage.getItem("create");
    const data = writable(localData ? JSON.parse(localData) : []);
  });

  const setInput = (): void => {
    input = !input;
    resetearBusqueda();
  };
  const resetearBusqueda = (): void => {
    busqueda = "";
  };
</script>

<div class="main">
  <div class="navbar w-full flex items-center justify-center gap-8">
    <div class="centro">
      <a href="/home" class="font-bold text-3xl mr-3">My blog</a>
      <hr />

      <a class:ocultar={input === true} href="/">News</a>
      <a class:ocultar={input === true} href="/">Linux</a>
      <a class:ocultar={input === true} href="/">How to</a>
      <a class:ocultar={input === true} href="/">About</a>
      <hr />
      <hr />
      <hr />

      {#if !input}
        <button class="icon" on:click={setInput}>
          <Icon icon="material-symbols:search-rounded" />
        </button>
        <p class="cntr">ctrl + x</p>
      {:else}
        <!-- svelte-ignore a11y-autofocus -->
        <input
          bind:value={busqueda}
          autofocus
          type="text"
          placeholder="Find articles"
        />
        {#if busqueda !== ""}
          <button class="cubrir" on:click={setInput} />
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
      {#if data.user === "" || data.user === undefined}
        <button class="flex items-center justify-center"
          ><a style="border: none;" href="/login">Log in</a></button
        >
      {:else}
        <button class="flex items-center justify-center"
          ><a style="border: none;" href="/create">Create</a></button
        >
      {/if}
    </div>
  </div>
  <slot />
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;900&display=swap");
  .navbar {
    position: fixed;
    border-bottom: 1px solid #353535;
    height: 55px;
    background-color: #0f0f0f;
    z-index: 8;
    display: flex;
    align-items: center;
  }
  .centro {
    display: flex;
    width: 800px;
    align-items: center;
    gap: 30px;
  }
  .resultados {
    width: 550px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    background-color: #1c1c1c;
    z-index: 10;
    position: absolute;
    top: 60px;
    border: 1px solid rgb(47, 47, 47);
    overflow: hidden;
  }
  .ocultar {
    cursor: none;
    visibility: hidden;
  }
  .cubrir {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    border: none;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 3;
    height: 100%;
  }
  .cntr {
    position: absolute;
    margin-left: 490px;
    background-color: #323232;
    border-radius: 20px;
    width: 70px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cubrir:hover {
    background-color: transparent;
  }
  .cubrir:focus {
    background-color: transparent;
  }
  .res {
    height: 80px;
    border-bottom: 1px solid rgb(47, 47, 47);
    word-break: break-all;
    display: grid;
    transition: 0.3s;
  }
  .res > :nth-child(2) {
    margin-top: -20px;
  }
  .res:hover {
    background-color: #353535;
    transition: 0.3s;
  }
  input {
    height: 40px;
    width: 550px;
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
    margin-left: 500px;
  }
  button {
    width: 100px;
  }
  a {
    z-index: 5;
    height: 55px;
    display: flex;
    align-items: center;
  }
  a:hover {
    border-bottom: 1px solid white;
  }
</style>
