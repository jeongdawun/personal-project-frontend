<template lang="">
    <div>  
        <div class="signupForm">
            <h2>회원가입</h2>
            <hr class="signupFormTopLine">
            <form>
                <v-text-field v-model="email" label="이메일" :rules="email_rule" color="red" required></v-text-field>  
                <div class="checkEmailInfo">
                    <v-btn class="checkValue" @click="checkEmail">중복확인</v-btn>
                    <span>{{ guide1 }}</span>
                </div>
                <div class="checkEmailInfo">
                    <v-btn class="checkValue" @click="sendEmail">인증하기</v-btn>
                    <span>{{ guide2 }}</span>
                    <input type="text" id="inputCode" v-model="inputAuthCode">
                    <v-btn class="checkValue" @click="checkCode">확인</v-btn>
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
            <div class="snsForm">
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
            </div>
            <!-- <hr class="signupFormBottomLine"> -->
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
            guide2: '인증코드 입력: ',
            authCode: 0,
            inputAuthCode: '',
            email: '',
            password: '',
            passwordCheck: '',
            roleType: "NORMAL",

            emailDuplicate: true,
            checkPasswordValid: false,
            checkEmailDuplicate: false,
            checkEmailAuthorize: false,

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

            const emailValid = this.email_rule.every(rule => rule(this.email) === true);
            const passwordValid = this.password_rule.every(rule => rule(this.password) === true);

            if(this.checkPasswordValid == true && this.emailDuplicate == false && this.email != null  && this.password != null && this.checkEmailAuthorize == false && emailValid && passwordValid) {
                const { email, password, roleType } = this
                this.$emit('submit', { email, password, roleType })
            } else if (this.emailDuplicate == true && this.checkEmailDuplicate == true) {
                alert("중복된 이메일입니다.")
            } else if (this.checkEmailDuplicate == false ) {
                alert("이메일 중복 여부를 확인하세요.")
            } else if (!passwordValid) {
                alert("비밀번호 형식을 확인해주세요.")
            } else if (!emailValid) {
                alert("이메일 형식을 확인해주세요.")
            }
            
            // 인증은 일단 보류, 테스트하면서 매번 인증해야 해서 번거롭다 -> 시현할 때 설정 예정
            // else if (this.checkEmailAuthorize == false ) {
            //     alert("이메일 인증이 필요합니다.")
            // }
        },
        checkPassword() {
            if(this.password === this.passwordCheck) {
                this.checkPasswordValid = true
            } else {
                this.checkPasswordValid = false
                alert('비밀번호가 일치하지 않습니다.')
            }
        },
        clear () {
            router.push('/')
        },
        async checkEmail () {
            this.emailDuplicate = await this.requestCheckEmailDuplicate({email: this.email})
            if(this.emailDuplicate == false) {
                this.guide1 = "확인이 완료되었습니다."
                this.checkEmailDuplicate = true;
            } else {
                this.guide1 = "중복된 이메일입니다."
                this.checkEmailDuplicate = true;
            }
        },
        async sendEmail () {
            this.authCode = await this.requestAuthorizeEmailToSpring({email: this.email})
        },
        checkCode () {
            if(this.inputAuthCode == this.authCode) {
                alert("인증완료")
                this.checkEmailAuthorize = true
            } else {
                alert("인증되지 않은 이메일입니다.")
            }
        }
    },
}
</script>

<style scoped>

.signupForm {
    padding-top: 100px;
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
    padding-top: 20px;
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
    font-weight: 500;
    color: rgb(37, 37, 37);
}
.checkEmailInfo {
    margin-top: 10px;
}
.snsForm {
    margin-top: 60px;
    background-color: rgb(247, 247, 247);
}
#inputCode{
    width: 310px;
}
</style>