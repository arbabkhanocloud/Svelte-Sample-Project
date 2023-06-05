import { writable, get } from "svelte/store";
import NetworkManager from "../services/network-manager";
import { HOME_ROUTE, LOCATION_ROUTE } from "../constants/RoutesConstants";

const defaultAuthContext = {
  isAuthenticated: false,
  isAuthenticating: false,
  unAuthorized: false,
  accountType: "",
  landingPage: "",
  //   setLogin: setLogin,
};

export const authContextStore = writable(defaultAuthContext);

export async function setLogin(username: any, password: any) {
  try {
    const response = await NetworkManager.signIn(username, password);
    const token = response.data.access_token;
    if (token) {
      localStorage.setItem("token", token);
      const type = await NetworkManager.getAccountType();

      authContextStore.update((state) => ({
        ...state,
        isAuthenticated: true,
        unAuthorized: false,
        accountType: type.data,
        landingPage: type.data === "Prospect" ? HOME_ROUTE : LOCATION_ROUTE,
      }));
      localStorage.setItem("isAuthenticated", "true");
    }
    // console.log("authstore:", authContextStore);
  } catch (error: any) {
    authContextStore.update((state) => ({ ...state, unAuthorized: true }));
    return error.response.data.message;
  }
  console.log("getAuth", get(authContextStore).isAuthenticated);
  return get(authContextStore).isAuthenticated;
}

export function setLogout() {
  authContextStore.update((state) => ({ ...state, isAuthenticated: false }));
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("token");
  window.location.reload();
}
