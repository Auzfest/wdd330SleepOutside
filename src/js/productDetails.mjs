import { findProductById } from "./productData.mjs";
import { setLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productID, selector) {
    product = await findProductById(productID);
    
    const el = document.querySelector(selector);
    el.insertAdjacentHTML("afterBegin", productDetailsTemplate(product));
    
    document.getElementById("addToCart").addEventListener("click", addToCart);

}

function addToCart() {
    setLocalStorage("so-cart", product);
    const cart = document.querySelector(".cart");
    cart.classList.add('animate');

    cart.addEventListener('animationend', function() {
        cart.classList.remove('animate');
    }, { once: true });}

function productDetailsTemplate(product) {
    return `<h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.Name}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>`;
}