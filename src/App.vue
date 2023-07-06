<template>
  <v-app>
    <v-main>
      <NavigationMenu/>
      <router-view/>
    </v-main>
  </v-app>
</template>


<script>
import NavigationMenu from './views/navigation/NavigationMenu.vue'
export default {
  components: {
    NavigationMenu
  }
}
</script>
<style scoped>
</style>
