<template lang="">
    <div>
        <div class="loginForm">
            <h2>LOGIN</h2>
            <!-- <hr class="signInFormTopLine"> -->
            <form>
                <v-text-field v-model="email" label="이메일" color="red"></v-text-field>
                <v-text-field v-model="password" label="비밀번호" color="red"></v-text-field>
                            
                <v-row align="center" justify="center">
                    <v-col cols="auto">
                        <v-btn class="submitBtn" color="black" elevation="0" @click="onSubmit">로그인</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn class="clearBtn" elevation="0" @click="clear">취소</v-btn>
                    </v-col>
                </v-row>
            </form>

            <div class="snsForm">
            <v-row align="center" justify="center">
                <v-col cols="auto" id="SNS">
                    카카오 1초 로그인
                </v-col>
            </v-row>
            </div>
            <div class="signup">
            <v-row align="center" justify="center">
                <v-col cols="auto">
                    <a href="/signup">
                        이메일로 가입하기
                    </a>
                </v-col>
            </v-row>
            </div>
            <!-- <hr class="signInFormBottomLine"> -->
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
    padding-top: 100px;
}
h2{
    text-align: center;
    font-family: 'GmarketSans';
    font-weight: 200;
    font-size: 40px;
    padding-top: 20px;
        padding-bottom: 20px;
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
    width: 40%;
    height: 100px;
    margin: auto;
    padding-top: 60px;
    padding-bottom: 260px;
    font-family: 'SUIT-Regular';
    font-weight: 100;
}
.submitBtn {
    width: 200px;
    min-height: 60px;
    margin-top: 80px;
    margin-bottom: 80px;
    color: white;
    font-family: 'SUIT-Regular';
    font-size: 18px;
    font-weight: 200;
}
.clearBtn {
    width: 200px;
    min-height: 60px;
    margin-top: 80px;
    margin-bottom: 80px;
    font-family: 'SUIT-Regular';
    font-size: 18px;
    font-weight: 200;
}
#SNS {
    font-size: 18px;
    font-family: 'SUIT-Regular';
    font-weight: 400;
    color: rgb(255, 255, 255);
}
.snsForm {
    margin-top: 120px;
    height: 40px;
    background-color: rgb(0, 0, 0);
    text-align: center;
    display: flex;
}
.signup {
    /* padding-top: 20px; */
    font-size: 18px;
    font-family: 'SUIT-Regular';
    font-weight: 400;
    color: rgb(255, 255, 255);
    background-color: rgb(13, 178, 255);
    margin-top: auto;
    height: 40px;
    text-align: center;
    display: flex;
}
.signup a {
    color: white;
}
a {
    text-decoration: none;
    display: inline-block;
}
</style>