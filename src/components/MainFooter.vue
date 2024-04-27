<template>
    <header class="container-header">
        <div class="logo">DMO</div>
        <nav class="items">
            <a href="" @click="$router.push('/')">Inicio</a>
            <a href="#">{{$t("about")}}</a>
            <a href="#">Book now</a>
            <a href="" @click="changeLang">change lang</a>
            <a href="" @click="goLogin">Login</a>
        </nav>
    </header>
</template>

<script>
export default {
    methods: {
        goLogin() {
            this.$router.push('/login')
        },
        changeLang() {
            const lang = localStorage.getItem("locale") == 'FR' ? "EN" : "FR"
            localStorage.setItem("locale",lang)
            this.$i18n.locale = lang
        }
    }
}
</script>

<style scoped>
@import "styles/header/header.css"
</style>