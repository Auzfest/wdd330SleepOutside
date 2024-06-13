<script>
    import ProductSummary from "./ProductSummary.svelte";
    import { getProductByCategory } from "../externalServices.mjs";
    
    export let category;
    let promise = getProductByCategory(category);
</script>
    
    <p>{category}</p>
    {#await promise}
        <p>Loading...</p>
    {:then products}
        <ul class="product-list">
    {#each products as product}
        <li class="product-card"><ProductSummary {product}/></li>
    {/each}
        </ul>
    {/await}