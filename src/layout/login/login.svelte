<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { createForm } from "svelte-forms-lib";
  import logo from "$lib/images/murrayarronsonlogo.svg";
  import { setLogin } from "../../store/authContextStore";
  import { setLogout } from "../../store/authContextStore";
  import Input from "../../components/ui/input-field/InputField.svelte";
  import Button from "../../components/ui/button/Button.svelte";
  import { HOME_ROUTE } from "../../constants/RoutesConstants";
  import { get } from "svelte/store";
  import { authContextStore } from "../../store/authContextStore";

  // let isAuthenticated = true;
  // $: isAuthenticating = false;
  // $: unAuthorized = false;
  // $: accountType = "";
  // $: landingPage = "";
  let context: any;

  // let isAuthenticated: boolean,
  // isAuthenticating: boolean,
  // unAuthorized: boolean;

  const unsubscribe = authContextStore.subscribe((state) => {
    context = state;
  });

  $: isAuthenticated = context.isAuthenticated;

  $: isLoading = false;
  $: error = "";
  $: userNameError = false;
  $: passwordError = false;
  $: {
    console.log("context:", context);
    console.log("isAuthenticated:", isAuthenticated);
  }

  const handlelog = () => {
    setLogout();
  };
  onMount(() => {
    if (isAuthenticated) {
      // window.location.href = HOME_ROUTE;
      console.log("route Changed");
    }
  });
  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      userName: "",
      password: "",
    },

    onSubmit: async (values) => {
      isLoading = true;
      const response = await setLogin($form.userName, $form.password);
      if (response === true) {
        // window.location.href = HOME_ROUTE;
        console.log("route Changed");
      } else {
        error = "Oops! Wrong Email or Password. Give it another try!";
        userNameError = true;
        passwordError = true;
      }
      isLoading = false;
    },
  });
  onDestroy(() => {
    unsubscribe();
  });
</script>

<h1>{isAuthenticated}</h1>
<div>
  <div class="login-container">
    <div class="sign-in-form-container">
      <form on:submit={handleSubmit} class="sign-in-form">
        <img class="murray-aronson-logo" src={logo} alt="logo" />
        <div class="top-margin" />
        <Input
          id="email"
          label="Email Address"
          type="email"
          className="form-input"
          placeholder="Email Address"
          bind:val={$form.userName}
        />
        <div class="bottom-margin" />
        <Input
          id="password"
          label="Password"
          type="password"
          bind:val={$form.password}
          className="form-input"
          placeholder="Password"
        />
        {#if error}
          <p class="error-message">{error}</p>
        {/if}
        <div class="align-check-box" />
        <Button className="sign-in-button " type="submit">SIGN IN</Button>
      </form>
    </div>
  </div>
</div>

<style>
  .login-container {
    background: url("../../lib/images/background-login.svg") no-repeat center
      fixed;
    background-size: cover;
    min-height: 100vh;
    font-size: 16px;
  }

  .sign-in-form-container {
    max-width: 80vw;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
  }

  .sign-in-form {
    display: flex;
    flex-direction: column;
    max-width: 540px;
    background-color: #fff;
    padding: 50px;
    margin: 17vh 0vw;
    border-radius: 10px;
  }
  .top-margin {
    padding-top: 95px;
  }
  .bottom-margin {
    padding-top: 30px;
  }

  button {
    color: white;
    border: none;
    height: 55px;
    max-width: 451px;
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: #00a4c6;
    border-radius: 10px;
    /* box-shadow: 0px 8px 24px 4px rgba(0, 115, 139, 0.16); */
    &:hover {
      background-color: #028da8;
    }
    &:disabled {
      background-color: #9fc1c8;
    }
  }

  .align-check-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 4px;
    padding-bottom: 50px;
  }
  .murray-aronson-logo {
    align-self: center;
    width: 388px;
    height: 80px;
  }
  @media screen and (max-device-width: 1150px) {
    .murray-aronson-logo {
      width: 300px;
    }
    .sign-in-form-container {
      flex-direction: column;
      align-items: center;
      max-width: 600px;
    }

    .sign-in-form {
      /* // margin-top: 10px; */
      margin-top: 250px;
      margin-bottom: 5vh;
    }
  }

  @media screen and (max-device-width: 660px) {
    .murray-aronson-logo {
      width: 240px;
    }
    .sign-in-form-container {
      max-width: 600px;
    }
    .sign-in-form {
      /* // margin-top: 10px; */
      margin-top: 250px;
      margin-bottom: 5vh;
      padding: 30px;
    }

    .login-container {
      font-size: 13px;
    }
  }

  @media screen and (max-device-width: 440px) {
    .murray-aronson-logo {
      width: 200px;
    }

    .sign-in-form-container {
      padding-left: 10px;
      padding-right: 10px;
    }

    .sign-in-form {
      padding: 20px;
    }
    .login-container {
      font-size: 12px;
    }
    .align-check-box {
      padding-bottom: 35px;
    }
  }
</style>
