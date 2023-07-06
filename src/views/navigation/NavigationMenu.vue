<template lang="">
    <nav>
        <v-app-bar color="white" elevation="0" class="bar1" height="60px" v-show="isBar1Visible">
            <a href="/">HAPPY CAMPER</a>
        </v-app-bar>
        <v-app-bar color="white" elevation="0" class="bar2" height="40px">
            <a href="/category1">오토캠핑</a>
            <a href="/category2">글램핑</a>
            <a href="/category3">카라반</a>
            <div class="searchBox">
                <input type="text" class="inputKeyword">
                <button text class="searchBtn">
                    <v-icon color="black">mdi-magnify</v-icon>
                </button>
            </div>
            <v-btn v-if="!isLogin" text @click="signUp">
                <span>회원가입</span>
            </v-btn>
            <v-btn v-if="!isLogin" text @click="signIn">
                <span>로그인</span>
            </v-btn>
            <v-btn v-if="isLogin" text @click="signOut">
                <span>로그아웃</span>
            </v-btn>
            <v-btn v-if="isLogin" text @click="myPage">
                <span>마이페이지</span>
            </v-btn>
        </v-app-bar>
    </nav>
</template>

<script>
import router from '@/router'
export default {
    data () {
        return {
            isLogin: false,
            isBar1Visible: true,
        }
    },
    methods: {
        signUp () {
            router.push('/signup')
            .catch(() => {})
        },
        signIn () {
            router.push('/login')
            .catch(() => {})
            this.userToken = sessionStorage.getItem("accessToken")
            if (this.userToken != null) {
                this.isLogin = true
            }
        },
        signOut () {
            sessionStorage.removeItem("accessToken")
            sessionStorage.removeItem("refreshToken")
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
        this.userToken = sessionStorage.getItem("accessToken")
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
}
.bar1 a {
    font-size: 24px;
    font-weight: 600;
    font-family: 'GmarketSans';
    text-decoration: none;
    padding-left: 20px;
    color: #73916A;
    display: inline-block;
    white-space: nowrap;
}
.bar2 a {
    font-weight: 400;
    font-family: 'GmarketSans';
    text-decoration: none;
    padding-left: 20px;
    color: #000000;
    display: inline-block;
    white-space: nowrap;
}
.v-application span {
    font-family: 'GmarketSans';
    color: rgb(0, 0, 0);
    font-weight: 200;
}
.searchBox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 77%;
}
.inputKeyword {
    border: none;
    outline: none;
    border-bottom: 1px solid black;
    width: 300px;
}
</style>