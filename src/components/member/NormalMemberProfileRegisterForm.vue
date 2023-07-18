<template lang="">
    <div>  
        <div class="myProfileMenu">
            <h2>회원 정보 수정</h2>
            <!-- <hr class="profileFormTopLine"> -->
            <form>
                <Strong>기본정보</Strong>
                <div class="infoBox">
                    <v-text-field v-model="email" label="이메일" filled readonly disabled></v-text-field>
                    <a href="/withdraw">
                        <span class="withdraw">회원탈퇴 ></span>
                    </a>
                </div>

                <Strong>추가정보</Strong>
                <div class="infoBox">
                    <v-text-field v-model="name" label="실명" color="red"></v-text-field>       
                    <v-text-field v-model="contactNumber" label="연락처" color="red"></v-text-field>       
                    <v-text-field v-model="nickName" label="닉네임" color="red"></v-text-field>  
                    <div class="checkNickNameInfo">
                        <v-btn class="checkValue" @click="checkNickName">중복확인</v-btn>
                        <span>{{ guide }}</span>
                    </div>
                    <v-text-field v-model="birthday" label="생일" color="red"></v-text-field>
                </div>      

                <v-row align="center" justify="center">
                    <v-col cols="auto">
                        <v-btn class="submitBtn" color="black" elevation="0" @click="onSubmit">수정하기</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn class="clearBtn" elevation="0" @click="clear">취소</v-btn>
                    </v-col>
                </v-row>
            </form>
            <!-- <hr class="profileFormBottomLine"> -->
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
            guide: '',
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
        ...mapActions(memberModule, ['requestRegisterProfileToSpring', 'requestCheckNickNameDuplicate', 'requestAuthorizeForUserProfileToSpring']),
        onSubmit () {
            if(this.nickName != null) {
                console.log("닉네임: " + this.nickName)
                if(this.nickName != null && this.checkNickNameDuplicate == false) {
                    alert("닉네임 중복 여부를 확인하세요")
                } else if(this.nickName != null && this.checkNickNameDuplicate == true) {
                    const { email, name, contactNumber, nickName, birthday } = this
                    this.$emit('submit', { email, name, contactNumber, nickName, birthday })
                }
            } else if(this.nickName == null) {
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
        this.userProfile = await this.requestAuthorizeForUserProfileToSpring()
        this.email = this.userProfile.email
        this.name = this.userProfile.name
        this.contactNumber = this.userProfile.contactNumber
        this.nickName = this.userProfile.nickName
        this.birthday = this.userProfile.birthday
    },
}
</script>

<style scoped>
@import "../../assets/styles/fonts.css";
.myProfileMenu {
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
    width: 60%;
    height: 400px;
    margin: auto;
    padding-top: 40px;
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
.checkNickNameInfo {
    margin-top: 10px;
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
Strong {
    font-size: 24px;
    font-family: 'SUIT-Regular';
    font-weight: 600;
}
.infoBox {
    padding-bottom: 40px;
    padding-top: 10px;
}
.withdraw {
    font-family: 'SUIT-Regular';
    font-weight: 200;
    font-size: 14px;
    text-decoration: none;
    color: #535353;
    display: inline-block;
    white-space: nowrap;
}
</style>