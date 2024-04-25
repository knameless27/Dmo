<template>
    <h1>joum</h1>
    <button @click="goLogin()">waos</button>
</template>

<script>

export default {
    methods: {
        goLogin() {
            this.$router.push('/login')
        }
    }
}
</script>