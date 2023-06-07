<script lang="ts">
  import Loader from "../../components/shared/loader/loader.svelte";
  import * as yup from "yup";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { createForm } from "svelte-forms-lib";
  import logo from "$lib/images/murrayarronsonlogo.svg";
  import { setLogin } from "../../shared/helper/helpers";
  import Input from "../../components/ui/input-field/InputField.svelte";
  import Button from "../../components/ui/button/Button.svelte";
  import { authContextStore } from "../../store/authContextStore";

  $: isLoading = false;
  $: error = "";
  $: emailError = false;
  $: passwordError = false;
  onMount(() => {
    console.log("mounted login page");

    if (authContextStore) {
      console.log("route Changed");
    }
  });

  $: {
    console.log("eror:", $errors.email);
  }

  const handleEmailChange = () => {
    emailError = false;
    error = "";
    $errors.email = "";
  };

  const handlePasswordChange = () => {
    passwordError = false;
    error = "";
    $errors.password = "";
  };

  $: inputPasswordClasses =
    ($authContextStore.unAuthorized && passwordError) || $errors.password
      ? "invalid-input-field"
      : "input-field-container";
  $: inputEmailClasses =
    ($authContextStore.unAuthorized && emailError) || $errors.email
      ? "invalid-input-field"
      : "input-field-container";

  const { form, errors, state, handleChange, handleSubmit, touched } =
    createForm({
      initialValues: {
        email: "",
        password: "",
      },

      validationSchema: yup.object().shape({
        email: yup.string().email().max(35).required(),
        password: yup.string().min(5).max(15).required(),
      }),

      onSubmit: async (values: any) => {
        console.log("inside submit button");
        isLoading = true;
        const response = await setLogin(values.email, values.password);
        if (response === true) {
          goto($authContextStore.landingPage);
        } else {
          error = "Oops! Wrong Email or Password. Give it another try!";
          emailError = true;
          passwordError = true;
        }
        isLoading = false;
      },
    });
</script>

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
          className={inputEmailClasses}
          placeholder="Email Address"
          bind:val={$form.email}
          handleChange={handleEmailChange}
        />
        {#if $errors.email}
          <small>{$errors.email}</small>
        {/if}
        <div class="bottom-margin" />
        <Input
          id="password"
          label="Password"
          type="password"
          className={inputPasswordClasses}
          bind:val={$form.password}
          placeholder="Password"
          handleChange={handlePasswordChange}
        />
        {#if $errors.password}
          <small>{$errors.password}</small>
        {/if}
        {#if error}
          <p class="error-message">{error}</p>
        {/if}
        <div class="align-check-box" />
        <Button
          className="sign-in-button "
          type="submit"
          isDisabled={error !== "" ||
            emailError ||
            passwordError ||
            $errors.email !== "" ||
            $errors.password !== ""}
        >
          {#if isLoading}
            <Loader />
          {:else}
            SIGN IN
          {/if}
        </Button>
      </form>
    </div>
  </div>
</div>

<style lang="scss">
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
