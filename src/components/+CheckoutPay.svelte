<script>
    import { theme } from "$lib/stores";
    import { slide } from "svelte/transition";
    export let totalCost;
    let paymentProvider = "";
    let expand = false;
</script>

<div
    style="background-color: {$theme.tertiary_bg};"
    class="p-3 rounded-4 text-light"
>
    {#if expand}
    <div transition:slide>
        <p class="text-cente small">Pay with</p>
        <div class="d-flex justify-content-around align-items-center mb-2">
            <div
                class="text-center rounded py-1 px-2 {paymentProvider ==
                    'momo' && 'bg-primary-subtle'}"
                on:click={() => (paymentProvider = "momo")}
            >
                <img
                    src="/momo_logo.webp"
                    class="rounded shadow-sm"
                    width="45"
                    alt="momo logo"
                />
                <p class="small mb-0">Momo</p>
            </div>
            <div
                class="text-center rounded py-1 px-2 {paymentProvider ==
                    'ozow' && 'bg-primary-subtle'}"
                on:click={() => (paymentProvider = "ozow")}
            >
                <img
                    src="/ozow_logo.png"
                    class="rounded p-1 shadow-sm"
                    width="45"
                    height="45"
                    alt="momo logo"
                />
                <p class="small mb-0">Ozow</p>
            </div>
        </div>        
    </div>

    {/if}

    <button
        class="btn btn-sm btn-primary bg-gradient w-100 rounded-3 d-flex justify-content-between"
        on:click={() => (expand = !expand)}
    >
        <i class="bi bi-lock-fill" />
        Pay R{totalCost.toFixed(2)}
        <span>{paymentProvider}</span>
    </button>
</div>
