<template lang="">
    <div>  
        <div class="myPageMenu">
            <h2>사업자 회원가입</h2>
            <!-- <hr class="signupFormTopLine"> -->
            <form>
                <v-text-field v-model="email" label="이메일" :rules="email_rule" color="red" required></v-text-field>  
                <div class="checkEmailInfo">
                    <v-btn class="checkValue" @click="checkEmail">중복확인</v-btn>
                    <span>{{ guideemail }}</span>
                </div>

                <div class="checkEmailInfo">
                    <v-btn class="checkValue" @click="sendEmail">인증하기</v-btn>
                    <span>{{ guidecode }}</span>
                    <input type="text" id="inputCode" v-model="inputAuthCode">
                    <!-- <v-btn class="checkValue" @click="checkCode">확인</v-btn> -->
                </div>

                <v-text-field v-model="password" label="비밀번호" 
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="password_rule"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                color="red"></v-text-field>
                    <span class="guide">{{ guidepassword }}</span>
                <v-text-field v-model="passwordCheck" label="비밀번호 확인" 
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2"
                color="red"></v-text-field>
                    <span class="guide">{{ guidepasswordcheck }}</span>
                <v-text-field v-model="businessNumber" label="사업자 번호" color="red"></v-text-field>

                <div class="checkBusinessInfo">
                    <v-btn class="checkValue" @click="checkBusinessNumber">중복확인</v-btn>
                    <span>{{ guidebusinessnumber }}</span>
                </div>

                <v-text-field v-model="businessName" label="사업장명" color="red"></v-text-field>
                    <span class="guide">{{ guidebusinessName }}</span>
                <v-row align="center" justify="center">
                    <v-col cols="auto">
                        <v-btn class="submitBtn" color="black" elevation="0" @click="onSubmit">가입</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn class="clearBtn" elevation="0" @click="clear">취소</v-btn>
                    </v-col>
                </v-row>
            </form>
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
            guideemail: '중복 확인이 필요합니다.',
            guidecode: '입력: ',
            guidebusinessnumber: '중복 확인이 필요합니다.',
            guidepassword: '',
            guidepasswordcheck: '',
            guidebusinessname: '',

            email: '',
            password: '',
            show1: false,
            show2: false,
            passwordCheck: '',
            businessNumber: '',
            businessName: '',
            roleType: "BUSINESS",
            authCode: 0,
            inputAuthCode: '',

            emailDuplicate: true,
            businessNumberDuplicate: true,

            checkPasswordValid: false,
            checkEmailDuplicate: false,
            checkEmailAuthorize: false,
            checkBusinessNumberDuplicate: false,

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
        ...mapActions(memberModule, ['requestCheckEmailDuplicate', 'requestAuthorizeEmailToSpring', 'requestCheckBusinessNumberDuplicate']),
        onSubmit () {
            if(this.email == '') {
                this.guideemail = "이메일은 필수 항목입니다."
            }
            if(this.password == '') {
                this.guidepassword = "비밀번호는 필수 항목입니다."
            }
            if(this.passwordCheck == '') {
                this.guidepasswordcheck = "비밀번호를 한 번 더 입력 후 확인해주세요."
            }
            if(this.passwordCheck == '') {
                this.guidepasswordcheck = "비밀번호를 한 번 더 입력 후 확인해주세요."
            }
            if(this.businessName == '') {
                this.guidebusinessName = "사업장명은 필수 항목입니다."
            }
            // 우선 이메일 인증은 보류해둠(&& this.checkEmailAuthorize == true)
            // this.checkCode ()
            this.checkPassword()
            const emailValid = this.email_rule.every(rule => rule(this.email) === true);
            const passwordValid = this.password_rule.every(rule => rule(this.password) === true);

            if(this.checkPasswordValid == true && this.emailDuplicate == false && this.businessNumberDuplicate == false && emailValid && passwordValid) {
                const { email, password, roleType, businessNumber, businessName } = this
                this.$emit('submit', { email, password, roleType, businessNumber, businessName })
            } else if (this.emailDuplicate == true && this.checkEmailDuplicate == true) {
                alert("중복된 이메일입니다.")
            } else if (this.checkEmailDuplicate == false ) {
                alert("이메일 중복 여부를 확인하세요.")
            }

        },
        checkPassword() {
            if(this.password === this.passwordCheck) {
                this.checkPasswordValid = true
            } else if (this.checkPasswordValid = false) {
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
                this.guideemail = "확인이 완료되었습니다."
                this.checkEmailDuplicate = true;
            } else {
                this.guideemail = "중복된 이메일입니다."
                this.checkEmailDuplicate = true;
            }
        },
        async checkBusinessNumber () {
            this.businessNumberDuplicate = await this.requestCheckBusinessNumberDuplicate({businessNumber: this.businessNumber})
            if(this.businessNumberDuplicate == false) {
                this.guidebusinessnumber = "확인이 완료되었습니다."
                this.checkBusinessNumberDuplicate = true;
            } else {
                this.guidebusinessnumber = "중복된 사업자 번호입니다."
                this.checkBusinessNumberDuplicate = true;
            }
        },
        async sendEmail () {
            this.authCode = await this.requestAuthorizeEmailToSpring({email: this.email})
        },
        // checkCode () {
        //     if(this.inputAuthCode == this.authCode) {
        //         alert("인증완료")
        //         this.checkEmailAuthorize = true
        //     } else {
        //         alert("인증되지 않은 이메일입니다.")
        //     }
        // }
    },
}
</script>

<style scoped>
@import "../../assets/styles/fonts.css";
.myPageMenu {
    padding-top: 100px;
}
h2{
    text-align: center;
    font-family: 'SUIT-Regular';
    font-weight: 200;
    font-size: 38px;
    padding-top: 20px;
    padding-bottom: 20px;
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
    margin-top: 200px;
}
form {
    width: 60%;
    height: 400px;
    margin: auto;
    padding-top: 20px;
    padding-bottom: 40px;
    font-family: 'SUIT-Regular';
    font-weight: 100;
}
span {
    padding-left: 10px;
    font-size: 14px;
    color: red;
}
.checkValue {
    border-radius: 10px;
    font-size: 14px;
    padding: 2px 10px 1px 10px;
}
.submitBtn {
    width: 200px;
    min-height: 60px;
    margin-top: 40px;
    margin-bottom: 80px;
    color: white;
    font-family: 'SUIT-Regular';
    font-size: 18px;
    font-weight: 200;
}
.clearBtn {
    width: 200px;
    min-height: 60px;
    margin-top: 40px;
    margin-bottom: 80px;
    font-family: 'SUIT-Regular';
    font-size: 18px;
    font-weight: 200;
}
.snsLogo {
    width: 40px;
}
#SNS {
    font-size: 18px;
    font-family: 'SUIT-Regular';
    font-weight: 400;
    color: rgb(255, 255, 255);
}
.checkEmailInfo {
    margin-top: 10px;
}
.snsForm {
    margin-top: 120px;
    height: 40px;
    background-color: rgb(0, 0, 0);
    text-align: center;
    display: flex;
}
#inputCode{
    margin-right: 10px;
    width: 310px;
    border: none;
    outline: none;
    border-bottom: 1px solid rgb(122, 122, 122);
    width: 100px;
}
</style>