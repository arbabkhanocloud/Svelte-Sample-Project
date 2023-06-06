<script lang="ts">
  export let type: "button" | "submit" | "reset" | null | undefined;
  export let className: string;
</script>

<button class={className} {type}>
  <slot />
</button>

<style>
  .sign-in-button {
    color: white;
    border: none;
    height: 55px;
    max-width: 451px;
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: #00a4c6;
    border-radius: 10px;
    &:hover {
      background-color: #028da8;
    }
    &:disabled {
      background-color: #9fc1c8;
    }
  }
</style>
