<template>
  <v-app>
    <NavigationMenu/>
    <v-main class="main">
      <router-view />
    </v-main>
    <FooterPage/>
  </v-app>
</template>

<script>
import NavigationMenu from './views/navigation/NavigationMenu.vue'
import FooterPage from './views/footer/FooterPage.vue'

export default {
  components: {
    NavigationMenu,
    FooterPage
  }
}
</script>

<style>
.main {
  height: auto;
  min-height: 100%;
}
</style>