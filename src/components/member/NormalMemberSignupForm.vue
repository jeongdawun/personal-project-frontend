<template lang="">
    <div>  
        <div class="myPageMenu">
            <h2>회원가입</h2>
            <hr class="signupFormTopLine">
            <form>
                <v-text-field v-model="email" label="이메일" :rules="email_rule" color="red" required></v-text-field>  
                <div>
                    <v-btn class="checkValue" @click="checkEmail">중복확인</v-btn>
                    <span>{{ guide1 }}</span>
                </div>
                <div>
                    <v-btn class="checkValue" @click="sendEmail">인증하기</v-btn>
                    <span>{{ guide2 }}</span>
                </div>
                <v-text-field v-model="password" label="비밀번호" :rules="password_rule" color="red"></v-text-field>
                <v-text-field v-model="passwordCheck" label="비밀번호 확인" color="red"></v-text-field>
                            
                <v-row align="center" justify="center">
                    <v-col cols="auto">
                        <v-btn class="submitBtn" color="#73916A" elevation="0" @click="onSubmit">가입</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn class="clearBtn" elevation="0" @click="clear">취소</v-btn>
                    </v-col>
                </v-row>
            </form>
            <v-row align="center" justify="center">
                <v-col cols="auto" id="SNS">
                    SNS로 가입
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
            <hr class="signupFormBottomLine">
        </div>
    </div>
</template>

<script>
import router from '@/router'
import { mapActions } from 'vuex'

const memberModule = 'memberModule'

export default {
    data () {
        return {
            guide1: '중복 확인이 필요합니다.',
            guide2: '이메일 인증을 진행해주세요.',
            authCode: 0,
            email: '',
            password: '',
            passwordCheck: '',
            roleType: "NORMAL",

            emailDuplicate: true,
            checkPasswordValid: false,
            checkEmailDuplicate: false,

            email_rule: [
                v => {
                    const replaceV = v.replace(/(\s*)/g, '')
                    const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
                    return pattern.test(replaceV) || '올바른 이메일 형식으로 입력해주세요!'
                }
            ],
            password_rule: [
                v => {
                    const replaceV = v.replace(/(\s*)/g, '')
                    const pattern = /^[0-9a-zA-Z](?=.*?[#?!@$%^&*-])(?=.*?[0-9])(?=.*?[A-Z]).{8,}$/
                    return pattern.test(replaceV) || '특수문자, 숫자, 영문(대문자, 소문자) 포함 9자리 이상'
                }
            ]
        }
    },
    methods: {
        ...mapActions(memberModule, ['requestCheckEmailDuplicate', 'requestAuthorizeEmailToSpring']),
        onSubmit () {
            this.checkPassword()
            if(this.checkPasswordValid == true && this.emailDuplicate == false && this.email != null  && this.password != null) {
                const { email, password, roleType } = this
                this.$emit('submit', { email, password, roleType })
            } else if (this.emailDuplicate == true && this.checkEmailDuplicate == true) {
                alert("중복된 이메일입니다.")
            } else if (this.checkEmailDuplicate == false ) {
                alert("이메일 중복 여부를 확인하세요.")
            }
        },
        checkPassword() {
            if(this.password === this.passwordCheck) {
                this.checkPasswordValid = true
            } else {
                this.checkPasswordValid = false
                alert('비밀번호를 확인해주세요.')
            }
        },
        clear () {
            router.push('/')
        },
        async checkEmail () {
            this.emailDuplicate = await this.requestCheckEmailDuplicate({email: this.email})
            if(this.emailDuplicate == false) {
                this.guide = "확인이 완료되었습니다."
                this.checkEmailDuplicate = true;
            } else {
                this.guide = "중복된 이메일입니다."
                this.checkEmailDuplicate = true;
            }
        },
        async sendEmail () {
            this.authCode = await this.requestAuthorizeEmailToSpring({email: this.email})
            console.log("받은 인증 코드는?" + this.authCode);
        }
    }
}
</script>

<style scoped>

.myPageMenu {
    padding-top: 100px;
}
.myPageMenu ul {
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    background-color: rgb(255, 0, 0);
    height: 46px;
    margin-top: 20px;
    width: 60%;
}
.myPageMenu li {
    display: block;
    width: 100%;
    text-align:center;
    font-weight: lighter;
    font-size: 14px;
    color: rgb(0, 255, 34);
    padding-top: 12px;
}
h2{
    text-align: center;
    font-family: 'GmarketSans';
    font-weight: 200;
    font-size: 40px;
    padding-top: 20px;
}
.signupFormTopLine {
    width: 40%;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
}
.signupFormBottomLine {
    width: 40%;
    margin: auto;
    margin-top: 80px;
}
form {
    width: 30%;
    height: 400px;
    margin: auto;
    padding-top: 40px;
    padding-bottom: 40px;
    font-family: 'GmarketSans';
    font-weight: 100;
}
span {
    padding-left: 10px;
    font-size: 14px;
}
.checkValue {
    border-radius: 10px;
    font-size: 14px;
    padding: 2px 10px 1px 10px;
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

</style>