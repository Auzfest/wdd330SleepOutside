import { loadHeaderFooter, getParam } from "./utils.mjs";
import checkout from "../js/components/CheckoutForm.svelte";

loadHeaderFooter();

new checkout({
    target: document.querySelector(".checkout"),  
  });