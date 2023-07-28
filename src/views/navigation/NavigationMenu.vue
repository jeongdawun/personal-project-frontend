<template lang="">
    <nav>
        <v-app-bar color="white" elevation="0" class="bar1" height="60px" v-show="isBar1Visible">
            <a href="/">
                <v-img :src="require('@/assets/happycamper/logo/happy_text_logo_2.png')" width="220"></v-img>
            </a>
        </v-app-bar>
        <v-app-bar color="white" elevation="0" class="bar2" height="60px">
            <a href="/" v-show="!isBar1Visible">
                <v-img :src="require('@/assets/happycamper/logo/happy_home.png')" width="30"></v-img>
            </a>
            <a href="/list"><span><Strong class="allProduct">ALL</Strong></span></a>
            <a @click="showAuto"><span><Strong>AUTO</Strong></span></a>
            <a @click="showGlamping"><span><Strong>GLAMPING</Strong></span></a>
            <a @click="showCaravan"><span><Strong>CARAVAN</Strong></span></a>
            <a href="/map"><span><Strong id="mapBtn"><span class="mdi mdi-map-marker-radius"></span> 지도에서 빈자리 찾기</Strong></span></a>
            <div class="searchBox">
                <input type="text" class="inputKeyword" v-model="keyword" placeholder="  캠핑장 이름으로 검색이 가능해요" @keyup.enter="searchProduct">
                <button text class="searchBtn" @click="searchProduct">
                    <v-icon color="black">mdi-magnify</v-icon>
                </button>
            </div>
            <v-btn v-if="!isLogin" text @click="signUp">
                <span>JOINUS</span>
            </v-btn>
            <v-btn v-if="!isLogin" text @click="signIn">
                <span>LOGIN</span>
            </v-btn>
            <v-btn v-if="isLogin" text @click="signOut">
                <span>LOGOUT</span>
            </v-btn>
            <v-btn v-if="isLogin" text @click="myPage">
                <span>MYPAGE</span>
            </v-btn>
        </v-app-bar>
    </nav>
</template>

<script>
import router from '@/router'
import { mapActions, mapState } from 'vuex';

const memberModule = 'memberModule'
const productModule = 'productModule'

export default {
    data () {
        return {
            isLogin: false,
            isBar1Visible: true,
            category: '',
            keyword: ''
        }
    },
    methods: {
        ...mapActions(memberModule, ['requestMemberLogoutToSpring']),
        ...mapActions(productModule, ['requestProductListByKeywordToSpring']),
        signUp () {
            router.push('/signup')
        },
        signIn () {
            router.push('/login')
        },
        async signOut () {
            await this.requestMemberLogoutToSpring()
            location.reload()
            .catch(() => {})
        },
        myPage () {
            router.push('/myPage')
            .catch(() => {})
        },
        handleScroll () {
            const scrollPosition = window.scrollY
            this.isBar1Visible = scrollPosition <= 0
        },
        showAuto() {
            this.category = "오토캠핑"
            this.$router.push(`/list/${this.category}`)
            .catch(() => {})
            location.reload()
        },
        showGlamping() {
            this.category = "글램핑"
            this.$router.push(`/list/${this.category}`)
            .catch(() => {})
            location.reload()
        },
        showCaravan() {
            this.category = "카라반"
            this.$router.push(`/list/${this.category}`)
            .catch(() => {})
            location.reload()
        },
        showMap () {
            router.push('/map')
        },
        async searchProduct() {
            await this.$router.push(`/list/keyword/${this.keyword}`)
            location.reload()
        }
    },
    computed: {
        ...mapState(productModule, ["products"]),
    },
    mounted () {
        const isLoginValue = localStorage.getItem("isLogin");
        this.isLogin = isLoginValue === "true" ? true : false;
        window.addEventListener('scroll', this.handleScroll)
    },
    beforeUnmount () {
        window.removeEventListener('scroll', this.handleScroll)
    }
}
</script>

<style scoped>
@import "../../assets/styles/fonts.css";
.bar2 {
    position: fixed;
    z-index: 999;
    padding-left: 22px;
}
.bar1 a {
    font-size: 24px;
    font-family: 'SUIT-Regular';
    font-weight: 600;
    text-decoration: none;
    padding-left: 40px;
    padding-top: 20px;
    color: #73916A;
    display: inline-block;
    white-space: nowrap;
}
#happy {
    font-size: 34px;
    font-family: 'SUIT-Regular';
    font-weight: 600;
    color: #73916A;
}
#mapBtn {
    color: #ffffff;
    background-color: rgb(0, 0, 0);
    padding: 2% 11% 3% 8%;
    border-radius: 22px;
    font-size: 13px;
    font-weight: 600;
}
.mdi.mdi-map-marker-radius {
    color: #ff3300;
}
.bar2 a {
    font-family: 'SUIT-Regular';
    font-weight: 600;
    font-size: 18px;
    text-decoration: none;
    padding-left: 20px;
    color: #252525;
    display: inline-block;
    white-space: nowrap;
}
.v-application span {
    font-family: 'SUIT-Regular';
    font-weight: 400;
    font-size: 14px;
    color: rgb(31, 31, 31);
}
.searchBox {
    font-family: 'SUIT-Regular';
    font-weight: 100;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 72%;
    padding-right: 190px;
}
.inputKeyword {
    border: none;
    outline: none;
    border-bottom: 1px solid rgb(122, 122, 122);
    width: 300px;
}
.allProduct {
    color: #ff3300;
}
</style>