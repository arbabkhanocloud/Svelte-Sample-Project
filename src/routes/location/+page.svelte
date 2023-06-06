<script lang="ts">
  import { authContextStore } from "../../store/authContextStore";

  let context: any;

  const authContext = authContextStore.subscribe((value) => {
    context = value;
  });
</script>

<svelte:head>
  <title>Location</title>
  <meta name="Login Page" content="Login Page" />
</svelte:head>

<h1>Location Page</h1>
<h1>isAuthenticated {context.isAuthenticated}</h1>
<!-- <Login /> -->
