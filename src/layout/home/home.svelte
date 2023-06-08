<script lang="ts">
  import VideoPlayer from "../../components/video-player/VideoPlayer.svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { authContextStore } from "../../store/authContextStore";
  import { onMount } from "svelte";

  let name = $page.url.searchParams.get("ProfileName");

  onMount(() => {
    console.log("mounted homepage");
    if (!$authContextStore.isAuthenticated) {
      goto("/login");
    }
  });

  // Access the query parameters
  const param1 = $page.url.searchParams.get("id");
  const param2 = $page.url.searchParams.get("ProfileName");

  $: {
    console.log("id:", param1);
    console.log("ProfileName:", param2);
  }
</script>

<div class="align-page-content">
  <h1>
    Take a look how{" "}
    <span class="murray-name">{name}</span> works
  </h1>
  <p>
    Lorem ipsum dolor sit amet consectetur. Nunc ut egestas rhoncus ac mauris.
    Sit amet aliquet leo ipsum elementum.
  </p>
  <!-- <VideoPlayer /> -->
</div>

<style src="./Home.module.scss">
</style>
