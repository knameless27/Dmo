<template>
    <header class="container-footer">
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

<style scoped>
@import "styles/footer.css"
</style>