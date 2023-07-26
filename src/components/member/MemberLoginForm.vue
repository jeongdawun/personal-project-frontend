<template lang="">
    <div class="out-container">
        <v-container class="signInForm"> 
            <div class="loginForm">
                <h2>LOGIN</h2>
                <div class="infoBox">
                    <span>이메일</span>
                    <div class="box">
                        <v-text-field filled rounded dense v-model="email" 
                            single-line>
                        </v-text-field>
                    </div>

                    <span>비밀번호</span>
                    <div class="box">
                        <v-text-field filled rounded dense v-model="password" 
                            single-line
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            hide-details="false"
                            @click:append="show1 = !show1">
                        </v-text-field>
                    </div>

                    <div class="box">
                        <v-row no-gutters justify="center">
                            <v-col cols="auto">
                                <v-btn class="submitBtn" color="#282F33" elevation="0" @click="onSubmit">로그인</v-btn>
                            </v-col>
                            <v-col cols="auto">
                                <v-btn class="clearBtn" elevation="0" @click="clear">취소</v-btn>
                            </v-col>
                        </v-row>
                    </div>
                    <div class="signupBtn">
                        <v-btn class="gotoSignup" small elevation="0" text @click="gotoSignup"><p> HAPPY CAMPER가 처음이신가요 ?　</p>　<Strong>이메일로 가입하기</Strong></v-btn>
                    </div>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
import router from '@/router'

export default {
    data () {
        return {
            email: '',
            password: '',
            show1: false,
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
        gotoSignup () {
            router.push('/signup')
        }
    }
}
</script>

<style scoped>
@import "../../assets/styles/fonts.css";
.out-container {
    background-color: rgb(250, 250, 250);
    height: 900px;
}
.loginForm {
    padding-top: 80px;
}
.checkValue {
    border-radius: 22px;
    font-size: 12px;
    font-weight: 100;
    color: rgb(255, 255, 255);
    margin-top: 8px;
    margin-left: 8px;
    margin-bottom: 6px;
}
h2{
    font-family: 'SUIT-Regular';
    text-align: center;
    font-weight: bold;
    padding-block: 20px;
    margin-top: 70px;
    font-size: 32px;
    color: #282F33;
}
span {
    font-size: 13px;
    font-weight: 600;
    padding-left: 20px;
    color: #282F33;
}
.box {
    border-radius: 12px;
    padding: 1% 2% 2% 2%;
    margin-left: 1%;
    margin-bottom: 6px;
}
.signInForm {
    width: 30%;
    font-family: 'SUIT-Regular';
    background-color: white;
    padding: 1%;
    height: 900px;
}
.infoBox {
    padding-bottom: 10px;
    padding-top: 20px;
}
.submitBtn {
    width: 200px;
    min-height: 40px;
    color: white;
    font-family: 'SUIT-Regular';
    font-size: 14px;
    font-weight: 200;
    margin-top: 20px;
    margin-left: 6px;
    margin-right: 6px;
    border-radius: 33px;
}
.clearBtn {
    width: 200px;
    min-height: 40px;
    font-family: 'SUIT-Regular';
    font-size: 14px;
    font-weight: 200;
    margin-top: 20px;
    margin-left: 6px;
    margin-right: 6px;
    border-radius: 33px;
}
.signupBtn p{
    margin-bottom: 0px;
    font-size: 12px;
    font-weight: 600;
    color: #282F33;
}
.signupBtn Strong{
    color: red;
}
.gotoSignup {
    margin-top: 80px;
    width: 100%;
    color: white;
}
</style>