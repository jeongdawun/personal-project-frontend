<template lang="">
    <div>  
        <div class="myProfileMenu">
            <h2>회원정보수정</h2>
            <hr class="profileFormTopLine">
            <form>
                <v-text-field v-model="email" label="이메일" readonly disabled></v-text-field>  
                <v-text-field v-model="name" label="실명" color="red"></v-text-field>       
                <v-text-field v-model="contactNumber" label="연락처" color="red"></v-text-field>       
                <v-text-field v-model="nickName" label="닉네임" color="red"></v-text-field>  
                <div class="checkNickNameInfo">
                    <v-btn class="checkValue" @click="checkNickName">중복확인</v-btn>
                    <span>{{ guide }}</span>
                </div>
                <v-text-field v-model="birthday" label="생일" color="red"></v-text-field>                              
                <v-row align="center" justify="center">
                    <v-col cols="auto">
                        <v-btn class="submitBtn" color="#73916A" elevation="0" @click="onSubmit">수정하기</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn class="clearBtn" elevation="0" @click="clear">취소</v-btn>
                    </v-col>
                </v-row>
            </form>
            <hr class="profileFormBottomLine">
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
            guide: '중복 확인이 필요합니다.',
            email: '',
            name: '',
            contactNumber: '',
            nickName: '',
            birthday: '',

            nickNameDuplicate: true,
            checkNickNameDuplicate: false,

            userProfile: []
        }
    },
    methods: {
        ...mapActions(memberModule, ['requestRegisterProfileToSpring', 'requestAuthorizeToSpring', 'requestCheckNickNameDuplicate', 'requestAuthorizeForUserProfileToSpring']),
        onSubmit () {
            if(this.nickName != '') {
                console.log("닉네임: " + this.nickName)
                if(this.nickName != '' && this.checkNickNameDuplicate == false) {
                    alert("닉네임 중복 여부를 확인하세요")
                } else if(this.nickName != '' && this.checkNickNameDuplicate == true) {
                    const { email, name, contactNumber, nickName, birthday } = this
                    this.$emit('submit', { email, name, contactNumber, nickName, birthday })
                }
            } else if(this.nickName == '') {
                const { email, name, contactNumber, nickName, birthday } = this
                this.$emit('submit', { email, name, contactNumber, nickName, birthday })
            }
        },
        clear () {
            router.push('/')
        },
        async checkNickName () {
            this.nickNameDuplicate = await this.requestCheckNickNameDuplicate({nickName: this.nickName})
            if(this.nickNameDuplicate == false) {
                this.guide = "확인이 완료되었습니다."
                this.checkNickNameDuplicate = true;
            } else {
                this.guide = "중복된 닉네임입니다."
                this.checkNickNameDuplicate = true;
            }
        },
    },
    async mounted () {
        this.userToken = sessionStorage.getItem("accessToken")
        console.log(this.userToken)
        this.userProfile = await this.requestAuthorizeForUserProfileToSpring({authorizationHeader: this.userToken})
        this.email = this.userProfile.email
        this.name = this.userProfile.name
        this.contactNumber = this.userProfile.contactNumber
        this.nickName = this.userProfile.nickName
        this.birthday = this.userProfile.birthday
    },
}
</script>

<style scoped>

.myProfileMenu {
    padding-top: 100px;
}
.myProfileMenu ul {
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    background-color: rgb(255, 0, 0);
    height: 46px;
    margin-top: 20px;
    width: 60%;
}
.myProfileMenu li {
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
.profileFormTopLine {
    width: 40%;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
}
.profileFormBottomLine {
    width: 40%;
    margin: auto;
    margin-top: 160px;
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
.checkNickNameInfo {
    margin-top: 10px;
}
.clearBtn {
    width: 140px;
    margin-top: 40px;
    font-family: 'GmarketSans';
    font-size: 15px;
    font-weight: 200;
}
</style>