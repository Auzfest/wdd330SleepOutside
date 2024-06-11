import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { cartCount } from "./stores.mjs";

let product = {};

export default async function productDetails(productID, selector) {
    product = await findProductById(productID);

    const el = document.querySelector(selector);
    if (product === undefined) {
      el.innerHTML = "Product not found";
    }
    else {
      el.insertAdjacentHTML("afterBegin", productDetailsTemplate(product));
      document.getElementById("addToCart").addEventListener("click", addToCart);
    }
    
}
function addToCart() {
  let cartContents = getLocalStorage("so-cart");
  //check to see if there was anything there
  if (!cartContents) {
    cartContents = [];
  }
  // then add the current product to the list
  cartContents.push(product);
  setLocalStorage("so-cart", cartContents);
  // update the visible cartCount
  cartCount.set(cartContents.length);
  const cart = document.querySelector(".cart");
  cart.classList.add('animate');

  cart.addEventListener('animationend', function() {
      cart.classList.remove('animate');
  }, { once: true });

  }

    

function productDetailsTemplate(product) {
    if (product.Brand.Name === "The North Face") {
        product.FinalPrice = (product.FinalPrice - (product.FinalPrice * .1)).toFixed(2);
        return  `<h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.NameWithoutBrand}</h2>
        <img
          class="divider"
          src="${product.Images.PrimaryMedium}"
          alt="${product.Name}"
        />
        <p class="product-discount__price">10% off! $${product.FinalPrice}</p>
        <p class="product__color">${product.Colors[0].ColorName}</p>
        <p class="product__description">
        ${product.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>`;
    }
    return `<h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryMedium}"
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