<script>
    export let categories;
    export let filter;

    let active = [];

    function selectCategory(id) {
        if (!active.includes(id)) {
            active.push(id)
            active = active // trigger reactivity
        } else {
            active.splice(active.indexOf(id), 1)
            active = active // trigger reactivity
        }
        if (!active.length) return filter([])
        let filtereNames = categories.map(item => {
            if (active.includes(item.id)) return item.name
        })
        filter(filtereNames)
    }
</script>

<div class="d-flex mb-4 position-relative align-items-center">
    <span class="fade-to-left position-absolute start-0">
        <i class="bi bi-chevron-left fs-3 text-light" />
    </span>
    <ul
        id="category"
        class="px-5 list-unstyled d-flex display-4 fs-4 mb-0 text-body-tertiary overflow-x-scroll scroll-hidden text-"
    >
        <li
            on:click={() => active = []}
            class="mx-3 {!active.length && "text-dark fw-semibold"}"
        >
            all
        </li>
        {#each categories as category}
            <li
                on:click={() => selectCategory(category.id)}
                class="mx-3 {active.includes(category.id) && "text-dark fw-semibold"}"
            >
                {category.name}
            </li>
        {/each}
    </ul>
    <span class="fade-to-right position-absolute end-0 text-end">
        <i class="bi bi-chevron-right fs-3 text-light" />
    </span>
</div>

<style>
    .fade-to-right {
        background: linear-gradient(to left, #fff 20%, rgba(255, 255, 255, 0) 80%);
        width: 50px;
    }

    .fade-to-left {
        background: linear-gradient(to right, #fff 20%, rgba(255, 255, 255, 0) 80%);
        width: 50px;
    }
</style>