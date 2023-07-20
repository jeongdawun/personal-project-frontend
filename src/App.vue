<template>
  <v-app>
    <v-main>
      <NavigationMenu/>
      <router-view/>
      <div class="footer">
          <FooterPage/>
        </div>
    </v-main>
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
<style scoped>
.footer {
  padding-top: 160px
}
</style>
