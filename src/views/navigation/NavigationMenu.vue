<template lang="">
    <nav>
        <v-app-bar color="white" elevation="0" class="bar1" height="60px" v-show="isBar1Visible">
            <a href="/">
                <!-- HAPPY CAMPER -->
                <span id="happy">HAPPY </span>
                <span id="camper">CAMPER</span>
            </a>
        </v-app-bar>
        <v-app-bar color="white" elevation="0" class="bar2" height="60px">
            <a href="/category1">AUTO</a>
            <a href="/category2">GLAMPING</a>
            <a href="/category3">CARAVAN</a>
            <div class="searchBox">
                <input type="text" class="inputKeyword">
                <button text class="searchBtn">
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
import { mapActions } from 'vuex';

const memberModule = 'memberModule'

export default {
    data () {
        return {
            isLogin: false,
            isBar1Visible: true,
        }
    },
    methods: {
        ...mapActions(memberModule, ['requestMemberLogoutToSpring']),
        signUp () {
            router.push('/signup')
            .catch(() => {})
        },
        signIn () {
            router.push('/login')
            .catch(() => {})
            this.userToken = localStorage.getItem("AccessToken")
            if (this.userToken != null) {
                this.isLogin = true
            }
        },
        signOut () {
            this.requestMemberLogoutToSpring()
            this.isLogin = false
        },
        myPage () {
            router.push('/myPage')
            .catch(() => {})
        },
        handleScroll () {
            const scrollPosition = window.scrollY
            this.isBar1Visible = scrollPosition <= 0
        }
    },
    mounted () {
        this.userToken = localStorage.getItem("AccessToken")
        if (this.userToken != null) {
        this.isLogin = true
        }
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
}
.bar1 a {
    font-size: 24px;
    font-family: 'SUIT-Regular';
    font-weight: 600;
    text-decoration: none;
    padding-left: 40px;
    color: #73916A;
    display: inline-block;
    white-space: nowrap;
}
#happy {
    font-size: 24px;
    font-family: 'SUIT-Regular';
    font-weight: 600;
    color: #73916A;
}
#camper {
    font-size: 24px;
    font-family: 'SUIT-Regular';
    font-weight: 400;
    color: #73916A;
}
.bar2 a {
    font-family: 'SUIT-Regular';
    font-weight: 600;
    font-size: 18px;
    text-decoration: none;
    padding-left: 40px;
    color: #000000;
    display: inline-block;
    white-space: nowrap;
}
.v-application span {
    font-family: 'SUIT-Regular';
    font-weight: 400;
    font-size: 16px;
    color: rgb(0, 0, 0);
}
.searchBox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 68%;
  padding-right: 90px;
}
.inputKeyword {
    border: none;
    outline: none;
    border-bottom: 1px solid rgb(122, 122, 122);
    width: 300px;
}
</style>