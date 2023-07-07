<template>
  <v-footer v-bind="localAttrs" :padless="padless">
    <v-card
      flat
      tile
      width="100%"
      class="menu"
      color="#F6F6F6"
    >
      <v-card-text class="menu text-center">
        <ul style="">
          <li>회사소개</li>
          <li>
              <a href="/signup-business">파트너 신청</a>
          </li>
          <li>개인정보처리</li>
          <li>고객센터</li>
        </ul>
      </v-card-text>
    </v-card>
      <v-divider></v-divider>
      <v-card
      flat
      tile
      width="100%"
      class="companyinfo"
      color="#white"
    >
      <v-card-text class="white text-center">
        <strong>HAPPY CAMPER</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      padless: true,
      variant: 'fixed',
    }),
    computed: {
      localAttrs () {
        const attrs = {}

        if (this.variant === 'default') {
          attrs.absolute = false
          attrs.fixed = false
        } else {
          attrs[this.variant] = true
        }
        return attrs
      },
    },
  }
</script>

<style scoped>
@import "../../assets/styles/fonts.css";
.menu {
  height: 40px;
  padding: 4px;
}
.menu li {
  display: block;
  width: 20%;
  text-align:center;
  font-weight: lighter;
  font-size: 14px;
  padding-top: 2px;
}
.menu a {
  text-decoration: none;
  display: inline-block;
  white-space: nowrap;
  color: rgb(109, 109, 109);
}
.companyinfo{
  height: 120px;
  font-family: 'GmarketSans';
}
.white {
  padding-top: 30px;
}
ul {
  display: flex;
  justify-content: center;
  list-style:none;
  text-align: center;
  font-family: 'GmarketSans';
}
</style>