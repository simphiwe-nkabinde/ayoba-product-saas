<script>
    import { PUBLIC_STRAPI_URL } from '$env/static/public'
    import { page } from '$app/stores';
    import { getCartItemQty, updateCartItemQty } from '$lib/cartUtilities.js';
    import { cart, theme } from '$lib/stores.js';

    export let data
    let product = data.products.data.find(p => p.id == $page.params.id)

    function UpdateProductQty(increment) {
        cart.update(currVal => {
            const productQty = getCartItemQty(currVal, $page.params.id )
            return updateCartItemQty(currVal, $page.params.id, productQty + (increment))
        })
    }
</script>

<main class="container">
    <a href="/{$page.params.microapp}" class="mb-3 d-block text-decoration-none text-primary-emphasis">
        <i class="bi bi-arrow-left"></i> back
    </a>
    
    <div id="carousel-indicators" class="carousel slide">
        <div class="carousel-indicators">
            {#each product.attributes.images.data as imageData,i (imageData.id)}
                <button type="button" 
                    data-bs-target="#carousel-indicators" 
                    data-bs-slide-to={i} class={!i && 'active'}
                    aria-current={!i ? 'true' : 'false'}
                    aria-label="Slide {i+1}">
                </button>
            {/each}
        </div>
        <div class="carousel-inner">
            {#each product.attributes.images.data as imageData, i (imageData.id)}
                <div class="carousel-item {!i && 'active'}">
                    <img src="{PUBLIC_STRAPI_URL}{imageData.attributes.url}" class="d-block w-100 object-fit-cover rounded"
                        alt="...">
                </div>
            {/each}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel-indicators"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel-indicators"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    <div class="mt-3">
        <h5 style="color: {$theme.primary_text_color};" class="display-6 fs-3 fw-medium text-capitalize">{product.attributes.name}</h5>
        <p class="small text-body-tertiary">{product.attributes.product_categories.map(c => c.name)}</p>
        <div class="d-flex justify-content-between align-items-end mb-3">
            <p class="fw-light mb-0 fs-3">R{product.attributes.price}</p>
            <div class="d-flex">
                {#if !getCartItemQty($cart, $page.params.id)}
                    <button style="background-color: {$theme.secondary_bg};" class="btn btn-sm text-dark me-1 border-0" on:click={() => UpdateProductQty(1)}>Buy</button>
                {:else}
                    <div class="d-flex">
                        <button style="background-color: {$theme.secondary_bg};" class="btn btn-sm" on:click={() => UpdateProductQty(-1)}>-</button>
                        <p class="border rounded mb-0 qty-input text-center mx-1">{getCartItemQty($cart, $page.params.id)}</p>
                        <button style="background-color: {$theme.secondary_bg};" class="btn btn-sm" on:click={() => UpdateProductQty(1)}>+</button>
                    </div>
                {/if}
            </div>                    
        </div>

        <p class="small fw-light">{product.attributes.description}</p>
    </div>
</main>
<style>
    .qty-input {
        width: 30px
    }
</style>