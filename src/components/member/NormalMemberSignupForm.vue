<template lang="">
    <div>
        <div class="myPageMenu">
            <h2>회원가입</h2>
            <hr class="signupFormTopLine">
            <form>
                <v-text-field v-model="email" label="이메일" color="red" required></v-text-field>
                <div>
                    <button class="checkValue" @click="checkEmailDuplicate">중복확인</button>
                <span>{{ guide }}</span>
                </div>
                <v-text-field v-model="password" label="비밀번호" color="red"></v-text-field>
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
export default {
    data () {
        return {
            guide: '중복 확인이 필요합니다.',
            email: '',
            password: '',
            passwordCheck: '',
            checkPasswordValid: false,
            roleType: NORMAL,
        }
    },
    method: {
        onSubmit () {
            this.checkPassword()
            if(this.checkPasswordValid == true) {
                const { email, password, roleType } = this
                this.$emit('submit', { email, password, roleType })
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
    /* background-color: rgb(255, 0, 0); */
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
    background-color: lightgray;
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