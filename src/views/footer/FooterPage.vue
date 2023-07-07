<template>
  <v-footer v-bind="localAttrs" :padless="padless" variant="default" class="footerInfo">
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
        <div class="leftInfo">
          <ul>
            <li>상호명 : HAPPYCAMPER</li>
            <li>　|　</li> 
            <li>대표자 : 정다운</li>
            <li>　|　</li>
            <li>주소 : 서울특별시 강남구 테헤란로14길 6 [6층]</li>
          </ul>
          <ul>
            <li>사업자등록번호 : 123-45-67891</li>
            <li>　|　</li>
            <li>통신판매업신고 : 제1111호-서울강남-11111호</li>
          </ul>
          <ul>
            <li>COPYRIGHT ⓒHAPPYCAMPER ALL RIGHT RESERVED</li>
          </ul>
        </div>
        <div class="rightInfo">
          <div class="imgBox">
            <v-img :src="require('@/assets/happycamper/happyTextLogo.png')"></v-img>
          </div>
        </div>
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
  font-weight: 500;
}
.menu a {
  text-decoration: none;
  display: inline-block;
  white-space: nowrap;
  color: rgb(109, 109, 109);
}
.companyinfo{
  height: 100px;
  font-family: 'GmarketSans';
}
.footerInfo {
  position: absolute;
}
ul {
  display: flex;
  justify-content: center;
  list-style:none;
  text-align: center;
  font-family: 'GmarketSans';
}
.leftInfo {
  background-color: #FEFBF2;
  position: absolute;
  width: 60%;
  padding-left: 4%;
  padding-top: 14px;
  font-weight: 500;
  font-size: 12px;
}
.rightInfo {
  background-color: #FEFBF2;
}
.imgBox {
  width: 260px;
  align-items: right;
  margin-left: 82%;
}
.white {
  padding: 0;
}
</style>