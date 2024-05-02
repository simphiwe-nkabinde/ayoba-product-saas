<script>
    import { PUBLIC_STRAPI_URL } from '$env/static/public';
    import {cart, theme} from '$lib/stores'
    import {getCartItemQty, updateCartItemQty} from '$lib/cartUtilities'
    import { page } from '$app/stores';
    export let product

    function UpdateProductQty(increment) {
        cart.update(currVal => {
            const productQty = getCartItemQty(currVal, product.id )
            return updateCartItemQty(currVal, product.id, productQty + (increment))
        })
    }
    function getProductQty() {
        return $cart.find(i => i.id == product.id).qty
    }
</script>
<div class="d-flex justify-content-between rounded-4 mb-2 p-2 shadow-sm bg-light-subtle">
    <a href="/{$page.params.microapp}/products/{product.id}" class="d-flex align-items-center text-decoration-none text-dark">
        <img width="70" height="80" class="object-fit-cover rounded-3" src="{PUBLIC_STRAPI_URL}{product.attributes.images.data[0].attributes.url}" alt="">
        <div class="ms-2 small">
            <p class="mb-1">{product.attributes.name}</p>
            <p class="mb-0">R{(product.attributes.price * getProductQty()).toFixed(2)}</p>
        </div>        
    </a>

    <div class="bg-secondary-subtl rounded-4 text-center">
        <button style="background-color: {$theme.secondary_bg};" class="btn btn-sm p-0 px-2 rounded qty-sqr" on:click={() => UpdateProductQty(1)}>+</button>
        <p class="rounded qty-sqr text-center mb-0 my-1">{getCartItemQty($cart, product.id)}</p>
        <button style="background-color: {$theme.secondary_bg};" class="btn btn-sm p-0 px-2 rounded qty-sqr" on:click={() => UpdateProductQty(-1)}>-</button>
    </div>
</div>
<style>
    .qty-sqr {
        width: 25px;
        height: 25px;
    }
</style>