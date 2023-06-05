<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { authContextStore } from "../store/authContextStore";

  let context: any;
  const unsubscribe = authContextStore.subscribe((state) => {
    context = state;
  });

  console.log("isAuthenticated:", context);
</script>

<svelte:head>
  <title>Home</title>
  <meta name="Home Page" content="Home Page" />
</svelte:head>

<h1>This is the Home Page</h1>

<style>
</style>
