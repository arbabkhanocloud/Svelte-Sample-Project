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
    // if (authContextStore) {
    //   console.log("route Changed");
    // }
  });

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
        isLoading = true;
        const response = await setLogin(values.email, values.password);
        if (response === true) {
          const params = new URLSearchParams();
          params.append("id", "5555");
          params.append("ProfileName", "arbab");

          const url = new URL(
            `${$authContextStore.landingPage}`,
            window.location.origin
          );
          url.search = params.toString();
          goto(url);
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

<style src="./Login.module.scss">
</style>
