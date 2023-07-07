<template lang="">
    <div>
        <div class="loginForm">
            <h2>LOGIN</h2>
            <hr class="signInFormTopLine">
            <form>
                <v-text-field v-model="email" label="이메일" color="red"></v-text-field>
                <v-text-field v-model="password" label="비밀번호" color="red"></v-text-field>
                            
                <v-row align="center" justify="center">
                    <v-col cols="auto">
                        <v-btn class="submitBtn" color="#73916A" elevation="0" @click="onSubmit">로그인</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn class="clearBtn" elevation="0" @click="clear">취소</v-btn>
                    </v-col>
                </v-row>
            </form>

            <div class="snsForm">
            <v-row align="center" justify="center">
                <v-col cols="auto" id="SNS">
                    SNS로 로그인
                </v-col>
                <v-col cols="auto">
                    <v-img class="snsLogo" src="@/assets/snsLogo/kakao.png"></v-img>
                </v-col>
                <v-col cols="auto">
                    <v-img class="snsLogo" src="@/assets/snsLogo/google.jpg"></v-img>
                </v-col>
                <v-col cols="auto">
                    <v-img class="snsLogo" src="@/assets/snsLogo/naver.png"></v-img>
                </v-col>
            </v-row>
            </div>
            <hr class="signInFormBottomLine">
        </div>
    </div>
</template>

<script>
import router from '@/router'

export default {
    data () {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        onSubmit () {
            const { email, password } = this
            this.$emit('submit', { email, password })
        },
        clear () {
            router.push('/')
        },
    }
}
</script>

<style scoped>
@import "../../assets/styles/fonts.css";
.loginForm {
    padding: 100px;
}
h2{
    text-align: center;
    font-family: 'GmarketSans';
    font-weight: 200;
    font-size: 40px;
    padding-top: 20px;
}
.signInFormTopLine {
    width: 40%;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
}
.signInFormBottomLine {
    width: 40%;
    margin: auto;
    margin-top: 80px;
}
form {
    width: 30%;
    height: 100px;
    margin: auto;
    padding-top: 40px;
    padding-bottom: 180px;
    font-family: 'GmarketSans';
    font-weight: 100;
}
.submitBtn {
    width: 140px;
    margin-top: 40px;
    color: white;
    font-family: 'GmarketSans';
    font-size: 15px;
    font-weight: 200;
}
.clearBtn {
    width: 140px;
    margin-top: 40px;
    font-family: 'GmarketSans';
    font-size: 15px;
    font-weight: 200;
}
.snsLogo {
    width: 40px;
}
#SNS {
    font-size: 20px;
    padding-left: 20px;
    padding-right: 60px;
    font-family: 'GmarketSans';
    font-weight: 600;
    color: rgb(73, 73, 73);
}
.snsForm {
    margin-top: 80px;
}
</style>