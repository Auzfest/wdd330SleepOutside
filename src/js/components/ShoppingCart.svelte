<script>
    import { getLocalStorage } from "../utils.mjs";
    const cartItems = getLocalStorage("so-cart");
  </script>
    
  <ul class="product-list">
    {#if cartItems === null || cartItems.length === 0}
        <p>There are no items in your cart.</p>
      {:else}
      {#each cartItems as item}
        <li class="cart-card divider">
          <a
            href="/product_pages/index.html?productid={item.Id}"
            class="cart-card__image"
          >
            <img src={item.Image} alt={item.Name} />
          </a>
          <a href="#">
            <h2 class="card__name">{item.Name}</h2>
          </a>
          <p class="cart-card__color">{item.Colors[0].ColorName}</p>
          <p class="cart-card__quantity">qty: 1</p>
          <p class="cart-card__price">${item.FinalPrice}</p>
        </li>
      {/each}
    {/if}
  </ul>