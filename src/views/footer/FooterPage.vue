<template>
  <v-footer color="black">
      <v-card
      flat
      tile
      width="60%"
      class="footer-menu"
      color="black"
      >
      <v-card-text class="footer-menu text-center">
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
    <v-card
    flat
    tile
    width="100%"
    class="companyinfo"
    color="black"
    >
      <v-card-text class="text-center">
        <v-row>
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
            <li>전화 : 070-1234-5678</li>
            <li>　|　</li>
            <li>이메일 : happycamper@happycamper.com</li>
          </ul>
        </div>
        <div class="rightInfo">
          <ul>
              <v-img :src="require('@/assets/happycamper/logo/happy_text_logo_1.png')" width="100"></v-img>
            </ul>
            <ul id="copy">COPYRIGHT ⓒHAPPYCAMPER ALL RIGHT RESERVED</ul>
        </div>
      </v-row>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {

}
</script>

<style scoped>
@import "../../assets/styles/fonts.css";
.footer-menu {
  height: 54px;
}
.footer-menu li {
  color: white;
  display: block;
  width: 20%;
  font-size: 16px;
  padding-top: 2px;
  font-weight: 200;
  margin: auto;
}
.footer-menu a {
  text-decoration: none;
  display: inline-block;
  white-space: nowrap;
  color: rgb(255, 255, 255);
}
.companyinfo {
  font-family: 'SUIT-Regular';
}
ul {
  color: white;
  display: flex;
  list-style: none;
  font-family: 'SUIT-Regular';
}
.leftInfo {
  width: 76%;
  padding-left: 6%;
  padding-top: 2%;
  padding-bottom: 2%;
  font-weight: 200;
  font-size: 14px;
  background-color: rgb(0, 0, 0);
}
.rightInfo {
  width: 24%;
  padding-right: 80px;
  padding-top: 2%;
  padding-bottom: 2%;
  font-weight: 200;
  font-size: 14px;
  background-color: rgb(0, 0, 0);
}
.leftInfo li{
  padding-top: 4px;
}
#copy {
  font-size: 13px;
}
</style>