<template>
  <v-app>
    <NavigationMenu/>
    <v-main class="main" 
      v-if="$route.name !== 'NormalMemberProfileRegisterPage' && 
            $route.name !== 'BusinessMemberSellerInfoRegisterPage' && 
            $route.name !== 'NormalMemberSignupPage' &&
            $route.name !== 'BusinessMemberSignupPage'"
    >
      <router-view />
    </v-main>
    <v-main v-else>
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
[v-cloak] .main {
  min-height: 100%;
}
</style>