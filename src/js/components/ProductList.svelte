<script>
    import ProductSummary from "./ProductSummary.svelte";
    import { getData } from "../productData.mjs";
    
    export let category;
    let promise = getData(category);
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