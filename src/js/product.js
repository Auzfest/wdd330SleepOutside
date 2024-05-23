import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const productId = getParam("product");
productDetails(productId, ".product-details");

loadHeaderFooter();