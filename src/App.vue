<template>
  <MainHeader />
  <router-view />
</template>

<script>
import MainHeader from "components/MainHeader.vue"
export default {
  name: 'App',
  components: {
    MainHeader
  }
}
</script>

<style>
</style>
