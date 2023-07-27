<template lang="">
    <div class="out-container">
        <v-container class="signUpContainer">
            <div class="signUpForm">
                <h2>JOIN US</h2>
                <div class="signUpBox">
                    <span>이메일</span>
                    <div class="box">
                        <v-text-field filled rounded dense v-model="email" 
                            single-line 
                            :rules="email_rule" 
                            hide-details="auto"
                            required>
                        </v-text-field>

                        <v-row no-gutters justify="center">  
                            <v-col cols="12">
                                <v-btn class="checkValue" small elevation="0" color="#FF5140" @click="checkEmail">중복확인</v-btn>
                                <span class="detailguide">{{ guideemail }}</span>
                            </v-col>
                            <v-col cols="12">
                                <v-btn class="checkValue" small elevation="0" color="#FF5140" @click="sendEmail">인증하기</v-btn>
                                <span class="detailguide">{{ guidecode }}</span>
                                <input type="number" id="inputCode" v-model="inputAuthCode">
                            </v-col>
                        </v-row>
                    </div>
                </div>

                <div class="signUpBox">
                    <span>비밀번호</span>
                    <div class="box">
                        <v-text-field filled rounded dense single-line v-model="password"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="password_rule"
                            :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"
                            hide-details="auto"
                            color="red">
                        </v-text-field>

                        <p class="detailguide">* 숫자, 영문(대문자 혹은 소문자) 포함</p>
                        <p class="detailguide">* 8자리 이상</p>
                        <span class="detailguide">{{ guidepassword }}</span>
                    </div>
                </div>

                <div class="signUpBox">
                    <span>비밀번호 확인</span>
                    <div class="box">
                        <v-text-field filled rounded dense single-line v-model="passwordCheck" 
                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show2 ? 'text' : 'password'"
                            @click:append="show2 = !show2"
                            color="red">
                        </v-text-field>
                    </div>
                </div>

                <div class="signUpBox">
                    <span>사업장명</span>
                    <div class="box">
                        <v-text-field filled rounded dense single-line v-model="businessName" 
                            color="red">
                        </v-text-field>
                    </div>

                    <span>사업자 번호</span>
                    <div class="box">
                        <v-text-field filled rounded dense single-line hide-details="auto" v-model="businessNumber" 
                            color="red">
                        </v-text-field>
                        <v-row no-gutters justify="center">  
                            <v-col cols="12">
                                <v-btn class="checkValue" small elevation="0" color="#FF5140" @click="checkBusinessNumber">중복확인</v-btn>
                                <span class="detailguide">{{ guidebusinessnumber }}</span>
                            </v-col>
                        </v-row>
                    </div>
                </div>

                <div class="signUpBox">
                    <div class="box">
                        <v-row align="center" justify="center">
                            <v-col cols="12">
                                <v-btn class="submitBtn" color="#282F33" elevation="0" @click="onSubmit">가입하기</v-btn>
                            </v-col>
                        </v-row>
                    </div>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

const memberModule = 'memberModule'

export default {
    data () {
        return {
            guideemail: '이메일 중복 확인이 필요합니다.',
            guidecode: '인증코드: ',
            guidebusinessnumber: '중복 확인이 필요합니다.',
            guidepassword: '',

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
                    const pattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                    return pattern.test(replaceV) || '올바른 비밀번호 형식으로 입력해주세요!'
                }
            ],
        }
    },
    methods: {
        ...mapActions(memberModule, ['requestCheckEmailDuplicate', 'requestAuthorizeEmailToSpring', 'requestCheckBusinessNumberDuplicate']),
        onSubmit () {
            if (this.email === '' || this.password === '' || this.passwordCheck === '' || this.businessName === '' || this.businessNumber === '') {
                alert('모든 필수 항목을 입력해주세요.')
                return
            }

            if(!this.checkCode ()) {
                return
            }
            if(!this.checkPassword ()) {
                return
            }

            if(!this.emailDuplicate && this.checkEmailDuplicate && !this.businessNumberDuplicate && this.checkBusinessNumberDuplicate && this.checkEmailAuthorize) {
                const { email, password, roleType, businessNumber, businessName } = this
                this.$emit('submit', { email, password, roleType, businessNumber, businessName })
            } else if (this.emailDuplicate && this.checkEmailDuplicate) {
                alert("중복된 이메일입니다.")
            } else if (!this.checkEmailDuplicate) {
                alert("이메일 중복 여부를 확인하세요.")
            }
        },
        checkPassword() {
            this.passwordValid = this.password_rule.every(rule => rule(this.password) === true);
            if(this.passwordValid) {
                if(this.password === this.passwordCheck) {
                    return true
                } else {
                    alert("비밀번호를 확인해주세요.")
                    return false
                }
            } else {
                alert("비밀번호 형식을 확인해주세요.")
                return false
            }
        },
        async checkEmail () {
            this.emailValid = this.email_rule.every(rule => rule(this.email) === true);
            if(this.emailValid) {
                this.emailDuplicate = await this.requestCheckEmailDuplicate(this.email)
                if(!this.emailDuplicate) {
                    this.guideemail = "확인이 완료되었습니다."
                    this.checkEmailDuplicate = true;
                } else {
                    this.guideemail = "중복된 이메일입니다."
                    this.checkEmailDuplicate = true;
                }
            }
        },
        async checkBusinessNumber () {
            this.businessNumberDuplicate = await this.requestCheckBusinessNumberDuplicate(this.businessNumber)
            if(!this.businessNumberDuplicate) {
                this.guidebusinessnumber = "확인이 완료되었습니다."
                this.checkBusinessNumberDuplicate = true;
            } else {
                this.guidebusinessnumber = "중복된 사업자 번호입니다."
                this.checkBusinessNumberDuplicate = true;
            }
        },
        async sendEmail () {
            if(!this.checkEmailDuplicate) {
                return alert("이메일 중복 여부를 확인해주세요.")
            }
            if(this.emailDuplicate) {
                return alert("중복된 이메일은 사용이 불가합니다.")
            }
            await alert("인증 코드가 발송되었습니다. 이메일을 확인해주세요.")
            this.authCode = await this.requestAuthorizeEmailToSpring(this.email)
        },
        checkCode () {
            if(parseInt(this.inputAuthCode) === 0 || this.authCode === 0) {
                alert("인증되지 않은 이메일입니다.")
                return false
            } 
            if(parseInt(this.inputAuthCode) != this.authCode) {
                alert("잘못된 인증번호입니다.")
                return false
            }
            else if(parseInt(this.inputAuthCode) === this.authCode) {
                this.checkEmailAuthorize = true
                return true
            } 
        },
    },
}
</script>

<style scoped>
@import "../../../assets/styles/fonts.css";
.out-container {
    background-color: rgb(250, 250, 250);
    height: 1080px;
    font-family: 'SUIT-Regular';
    color: #282F33;
}
.signUpContainer {
@media (max-width: 767px) {
    width: 100%;
}
    width: 30%;
    background-color: white;
    padding: 1%;
    height: 1180px;
}
.signUpForm {
    padding-top: 20px;
}
h2{
    text-align: center;
    font-weight: bold;
    padding-block: 20px;
    margin-top: 70px;
    font-size: 32px;
}
span {
    font-size: 13px;
    font-weight: 600;
    padding-left: 20px;
}
.boxBusinessInfo {
    border-radius: 12px;
    padding: 1% 2% 0% 2%;
    margin-left: 1%;
}
.box {
    border-radius: 12px;
    padding: 1% 2% 1% 2%;
    margin-left: 1%;
    margin-bottom: 6px;
}
.detailguide {
    font-size: 12px;
    font-weight: 100;
    padding-left: 10px;
    margin-top: 8px;
    margin-bottom: 6px;
}
.guide {
    padding: 0;
}
.checkValue {
    border-radius: 12px;
    font-size: 12px;
    font-weight: 100;
    color: rgb(255, 255, 255);
    margin-top: 8px;
    margin-left: 8px;
    margin-bottom: 6px;
}
.submitBtn {
    width: 100%;
    min-height: 40px;
    color: white;
    font-size: 14px;
    font-weight: 200;
    margin-top: 50px;
    margin-left: 6px;
    margin-right: 6px;
    border-radius: 33px;
}
#inputCode{
    margin-right: 10px;
    border: none;
    outline: none;
    border-bottom: 1px solid rgb(122, 122, 122);
    width: 20%;
}
</style>