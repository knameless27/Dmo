<template>
  <MainHeader />
  <router-view class="__main-content" />
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

.__main-content {
  display: flex;
  flex-direction: column;
  min-height: 89vh;
}
</style>
