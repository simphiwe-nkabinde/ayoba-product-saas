<script>
    import { getCartTotalCost, getCartTotalQty } from "$lib/cartUtilities";
    import { cart, theme } from "$lib/stores";
    import { fade, slide } from "svelte/transition";
    import CartItemCard from "./+CartItemCard.svelte";
    import CheckoutPay from "./+CheckoutPay.svelte";
    import { onMount } from 'svelte';
    export let products;

    let ayobaApi
    let username
    let userCountry

    onMount(async () => {
        ayobaApi = await import('ayoba-microapp-api');
        ayobaApi.getUserName(val => username = val);
        ayobaApi.getUserCountryCode(val => userCountry = val);
    })

    let expand = false;
</script>

{#if expand}
    <div
        style="background-color: {$theme.secondary_bg};"
        transition:fade
        class="position-fixed z-2 top-0 start-0 w-100 h-100 p-3 cart-dialog"
    >
            <div class="d-flex align-items-center cart-header text-light">
                <p
                    class="mb-0 text-primary-emphasis"
                    on:click={() => (expand = false)}
                >
                    <i class="bi bi-chevron-left fs-3" />
                </p>
                <div style="color: {$theme.primary_text_color};" class="ms-3" >
                    <h1 class="mb-0 fs-4">My Shopping Cart</h1> 
                    <p class="mb-0 small text-capitalize">{username || ayobaApi.getUserPhoneNumber()}{`(${userCountry})`}</p>
                </div>
            </div>
            <div class="cart-body overflow-y-scroll my-3 mx-1">
                {#if !$cart.length}
                    <p class="text-center my-5" style="color: {$theme.primary_text_color};">No items in your cart</p>
                {/if}
                {#each $cart as cartItem}
                    <CartItemCard product={products.find(p => p.id == cartItem.id)}/>
                {/each}                
            </div>


            <div class="cart-footer">
                <CheckoutPay totalCost={getCartTotalCost($cart, products)}/>
            </div>
        </div>
{:else}
    <button
    style="color: {$theme.primary_text_color};"
        class="text-dark fixed-bottom align-items-center bg-body-tertiary bg-gradient border shadow mb-2 mx-3 rounded-4 py-3 px-4"
        on:click={() => (expand = true)}
        transition:fade
    >
        {#if getCartTotalCost($cart, products)}
            <div transition:slide class="d-flex justify-content-between">
                <i class="bi bi-cart4" />
                <p class="mb-0">{getCartTotalQty($cart)} items</p>
                <p class="mb-0">
                    R{getCartTotalCost($cart, products).toFixed(2)}
                </p>
            </div>
        {:else}
            <div transition:slide class="d-flex justify-content-between">
                <i class="bi bi-cart4" />
                <p class="mb-0">{getCartTotalQty($cart)} items</p>
                <span />
            </div>
        {/if}
    </button>
{/if}

<style>
    .cart-dialog {
        display: flex;
        flex-direction: column;
    }
    .cart-header, .cart-footer {
        flex-grow: 0;
        flex-shrink: 0;
    }
    .cart-body {
        flex-grow: 1;
    }
</style>