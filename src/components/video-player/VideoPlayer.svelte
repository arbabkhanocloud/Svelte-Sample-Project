<script>
  import VideoPlayer from "svelte-video-player";
</script>

<div class="video-player-container">
  <VideoPlayer
    source="https://www.youtube.com/watch?v=mWytwmxLKmo&ab_channel=DevWorld"
    height="700"
  />;
</div>

<style lang="scss">
  .video-player-container {
    padding: 20px 0px;
    height: 150px;
    @media screen and (max-width: 992px) {
      height: 380px;
      width: 100%;
    }
    @media screen and (max-width: 576px) {
      height: 300px;
    }
    @media screen and (max-width: 385px) {
      height: 240px;
    }
  }
</style>
