import { writable } from "svelte/store";

const defaultAuthContext = {
  isAuthenticated: false,
  isAuthenticating: false,
  unAuthorized: false,
  accountType: "",
  landingPage: "",
};

export const authContextStore = writable(defaultAuthContext);
