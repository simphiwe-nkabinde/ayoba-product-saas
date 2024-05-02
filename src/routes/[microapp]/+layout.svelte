<script>
    import { theme } from "$lib/stores";
    import { onMount } from "svelte";
    import Cart from "../../components/+Cart.svelte";
    export let data;
    theme.set(data.theme.data.attributes);

    let ayobaApi

    onMount(async () => {
        ayobaApi = await import('ayoba-microapp-api');
    })
</script>

<header
    class="text-center mb-4 container py-3 shadow-sm"
    style="background: {$theme.primary_bg}; color: {$theme.primary_text_color}"

>
    <h1 class="mb-3 fs-1">{data.name}</h1>
    <p class="text-secondar fw-light text-light">
        {data.description}
    </p>
</header>

<slot />

<div class="my-5 text-center">
    <button 
        style="background: {$theme.primary_bg};"
        class="btn" on:click={() => ayobaApi.startConversation('+27780344163')}>Chat to us on Ayoba</button>
</div>

<Cart products={data.products.data} />
<div class="bottom-spacer" />