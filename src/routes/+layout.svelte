<script lang="ts">
  import { head_selector } from "svelte/internal";
  import "../app.postcss";
  import Icon from "@iconify/svelte";

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
  <h1 class="font-bold text-3xl">My blog</h1>
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
  .ocultar {
    cursor: none;
    visibility: hidden;
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
