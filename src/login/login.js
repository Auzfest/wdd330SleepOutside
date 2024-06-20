import { loadHeaderFooter, getParam } from "../js/utils.mjs";
import checkout from "../js/components/CheckoutForm.svelte";
import { login } from "./auth.mjs";

loadHeaderFooter();

const redirect = getParam("redirect"); 

addEventListener(button)
document.querySelector("button").addEventListener("click", (e) => {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  login({ email, password }, redirect);
});





