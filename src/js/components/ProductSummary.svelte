<script>
    export let product = {};
    let discountPrice;
</script>

<a href="/product_pages/index.html?product={product.Id}">
    <img src={product.Images.PrimaryMedium} alt="Image of {product.Name}" />
    <h3 class="card__brand">{product.Brand.Name}</h3>
    <h2 class="card__name">{product.NameWithoutBrand}</h2>
    {#if product.Brand.Name === "The North Face"}
        <p class="product-discount__price">10% off! ${(product.FinalPrice - (product.FinalPrice * .1)).toFixed(2)}</p>
        {:else}
            <p class="product-card__price">${product.FinalPrice.toFixed(2)}</p>
    {/if}
</a>
