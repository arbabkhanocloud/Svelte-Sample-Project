<script lang="ts">
  import { goto } from "$app/navigation";
  import { authContextStore } from "../../store/authContextStore";
  import { onMount } from "svelte";

  onMount(() => {
    console.log("mounted homepage");
    if (!$authContextStore.isAuthenticated) {
      goto("/login");
    }
  });
</script>

<h1>isAuthenticated = {$authContextStore.isAuthenticated}</h1>
<h1>UnAuthorized = {$authContextStore.unAuthorized}</h1>
<h1>This is Home Page</h1>

<button
  on:click={() => {
    goto("/login");
  }}
/>
