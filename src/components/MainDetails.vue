<template>
    <details>
        <summary>{{ title }}</summary>
        <div class="_content">
            <slot />
        </div>
    </details>
</template>

<script>
export default {
    props: {
        title: {
            default: "",
            required: true,
            type: String
        }
    }
}
</script>

<style scoped>
details {
    border: 1px solid var(--primary);
    border-radius: 15px 15px 15px 15px;
    color: var(--white);
    background-color: var(--bg-card);
}

details summary {
    border-radius: 15px 15px 15px 15px;
    padding: 1%;
    background-color: var(--bg-card);
    cursor: pointer;
}

._content {
    padding: 1%;
}
</style>