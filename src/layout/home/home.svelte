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
  <VideoPlayer />
</div>

<style lang="scss">
  .align-page-content {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    padding: 20px 20px 30px 20px;
    // margin: 61px 58px 0px 294px;
    box-shadow: 0px 20px 35px rgba(0, 63, 74, 0.08);
    & h1 {
      font-size: 36px;
    }
    & p {
      font-size: 14px;
    }
    @media screen and (max-width: 768px) {
      margin: 23px 18px 0px 18px;
    }
  }
  .murray-name {
    white-space: nowrap;
    color: #00a4c6;
  }
</style>
