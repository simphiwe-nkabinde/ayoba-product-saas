<script>
    import { page } from '$app/stores';
    import { PUBLIC_STRAPI_URL } from '$env/static/public'
    import { getCartItemQty, updateCartItemQty } from '$lib/cartUtilities.js';
    import { cart, theme } from '$lib/stores.js';
    export let product;

    function UpdateProductQty(increment) {
        cart.update(currVal => {
            const productQty = getCartItemQty(currVal, product.id )
            return updateCartItemQty(currVal, product.id, productQty + (increment))
        })
    }
    let qty


</script>
{#if product}
    <div class="product-card col-6">
        <a href="{$page.params.microapp}/products/{product.id}" class="text-decoration-none text-dark">
        <img class="object-fit-cover rounded mb-2 shadow-sm" src="{PUBLIC_STRAPI_URL}{product.attributes.images.data[0].attributes.url}" alt="">
        <h5 class="display-6 fs-6 text-capitalize">{product.attributes.name}</h5>
        </a>
        <div class="d-flex justify-content-between align-items-end" style="height: 30px;">
            <p class="text-body-tertiary fw-light mb-0">R{product.attributes.price}</p>
            {#if !getCartItemQty($cart, product.id)}
                <button style="background-color: {$theme.secondary_bg};" class="btn btn-sm text-dark me-1 border-0" on:click={() => UpdateProductQty(1)}>Buy</button>
            {:else}
                <div class="d-flex">
                    <button style="background-color: {$theme.secondary_bg};" class="btn btn-sm px-2 py-0" on:click={() => UpdateProductQty(-1)}>-</button>
                    <p class="qty-input mb-0 px-0 text-center border rounded mx-1">{getCartItemQty($cart, product.id)}</p>
                    <button style="background-color: {$theme.secondary_bg};" class="btn btn-sm px-2 py-0" on:click={() => UpdateProductQty(1)}>+</button>
                </div>
            {/if}
        </div>
    </div>
{:else}
    <div  class="product-card col-6 text-decoration-none text-dark placeholder-glow">
        <img class="object-fit-cover rounded mb-2 shadow-sm placeholder col-12"/>
        <h5 class="display-6 fs-6 text-capitalize">
            <span class="placeholder col-8"></span>
        </h5>
        <div class="d-flex justify-content-between align-items-end">
            <span class="text-body-tertiary fw-light mb-0 placeholder col-4"></span>
            <button class="btn btn-sm bg-secondary-subtle text-dark me-1 placeholder border-0 col-4"></button>
        </div>
    </div>
{/if}

<style>
    .product-card img {
        height: 50vw;
        width: 100%;
    }
    .qty-input {
        width: 30px;
        height: 25px;
    }
</style>