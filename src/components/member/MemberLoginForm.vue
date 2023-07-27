<template lang="">
    <div class="out-container">
        <v-container class="signInContainer"> 
            <div class="signInForm">
                <h2>LOGIN</h2>
                <div class="signInBox">
                    <span>이메일</span>
                    <div class="box">
                        <v-text-field 
                            filled rounded dense single-line
                            v-model="email">
                        </v-text-field>
                    </div>

                    <span>비밀번호</span>
                    <div class="box">
                        <v-text-field 
                            filled rounded dense single-line
                            v-model="password"
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show ? 'text' : 'password'"
                            hide-details="false"
                            @click:append="show = !show">
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
                        <v-btn class="gotoSignupPage" small elevation="0" text @click="gotoSignup"><p> HAPPY CAMPER가 처음이신가요 ?　</p>　<Strong>이메일로 가입하기</Strong></v-btn>
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
            show: false,
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
    color: #282F33;
    font-family: 'SUIT-Regular';
}
.signInContainer {
@media (max-width: 767px) {
    width: 100%;
}
    width: 30%;
    background-color: white;
    padding: 1%;
    height: 900px;
}
.signInForm {
    padding-top: 80px;
}
h2{
    text-align: center;
    font-weight: bold;
    margin-top: 90px;
    font-size: 32px;
}
span {
    font-size: 13px;
    font-weight: 600;
    padding-left: 20px;
}
.box {
    border-radius: 12px;
    padding: 1% 2% 2% 2%;
    margin-left: 1%;
    margin-bottom: 6px;
}
.signInBox {
    padding-bottom: 10px;
    padding-top: 20px;
}
.submitBtn, .clearBtn {
    width: 200px;
    min-height: 40px;
    color: white;
    font-size: 14px;
    font-weight: 200;
    margin-top: 20px;
    margin-left: 6px;
    margin-right: 6px;
    border-radius: 33px;
}
.clearBtn {
    color: #282F33;
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
.gotoSignupPage {
    margin-top: 80px;
    width: 100%;
    color: white;
}
</style>