<script>
    import CategoryNavigation from "../../components/+CategoryNavigation.svelte";
    import ProductCard from "../../components/+ProductCard.svelte";
    export let data;

    let filteredProducts = [];
    function filterByCategory(categories) {
        filteredProducts = data.products.data.filter((thisProduct) => {
            let thisProductCategories =
                thisProduct.attributes.product_categories.map((c) => c.name);

            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                const isIncluded = thisProductCategories.includes(category);
                if (isIncluded) return true;
            }
        });
    }

</script>

<CategoryNavigation
    categories={data.product_categories}
    filter={filterByCategory}
/>
<main class="container">
    <section class="row row-gap-4">
        {#if !filteredProducts.length}
            {#each data.products.data as product (product.id)}
                <ProductCard {product} />
            {/each}
        {:else}
            {#each filteredProducts as product (product.id)}
                <ProductCard {product} />
            {/each}
        {/if}
    </section>
</main>
