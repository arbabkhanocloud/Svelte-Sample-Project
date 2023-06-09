<span class="loader" />

<style lang="scss">
  .loader {
    border: 3px solid #f3f3f3;
    border-top: 3px solid #00a4c6;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
    margin-right: 5px;
    display: inline-block;
    vertical-align: middle;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
