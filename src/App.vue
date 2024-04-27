<template>
  <MainHeader />
  <router-view />
  <MainFooter />
</template>

<script>
import MainHeader from "components/MainHeader.vue"
import MainFooter from "./components/MainFooter.vue";

export default {
  name: 'App',
  components: {
    MainHeader,
    MainFooter
  },
}
</script>

<style>
@import "styles/main.css";
</style>
