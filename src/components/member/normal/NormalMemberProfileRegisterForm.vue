<template lang="">
    <div class="out-container">
        <v-container class="myProfileContainer">
            <div class="myProfileForm">
                <h2>MY PROFILE</h2>
                <div class="infoBox">
                    <span>이메일</span>
                    <div class="box"><input v-model="email" readonly disabled></input></div>
                    <a href="/withdrawal">
                        <span class="withdrawal">회원탈퇴 ></span>
                    </a>
                </div>

                <div class="infoBox">
                    <span>닉네임</span>
                    <v-row no-gutters justify="center">  
                        <v-col cols="12">
                            <div class="box"><input v-model="nickName" @change="handleCheckNickName"></input></div>
                        </v-col>
                        <v-col cols="12">
                            <div class="checkNickNameInfo">
                                <v-btn class="checkValue" small elevation="0" color="#FF5140" @click="checkNickName">중복확인</v-btn>
                                <span>{{ guide }}</span>
                            </div>
                        </v-col>
                    </v-row>
                    <span>이름</span>
                    <div class="box"><input dense v-model="name"></input></div>
                    <span>연락처</span>    
                    <div class="box"><input v-model="contactNumber"></input></div>
                    <span>생일</span>
                    <div class="box"><input v-model="birthday"></input></div>
                </div>      

                <v-row no-gutters align="center" justify="center">
                    <v-col cols="auto">
                        <v-btn class="submitBtn" color="#282F33" elevation="0" @click="onSubmit">저장하기</v-btn>
                    </v-col>
                        <v-col cols="auto">
                            <v-btn class="clearBtn" elevation="0" @click="clear">취소</v-btn>
                        </v-col>
                </v-row>
            </div>
        </v-container>
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
        ...mapActions(memberModule, ['requestCheckNickNameDuplicate', 'requestAuthorizeForUserProfileToSpring']),
        onSubmit () {
            const { email, name, contactNumber, nickName, birthday } = this
            this.$emit('submit', { email, name, contactNumber, nickName, birthday })
        },
        clear () {
            router.push('/')
        },
        async checkNickName () {
            this.nickNameDuplicate = await this.requestCheckNickNameDuplicate(this.nickName)
            if(this.nickNameDuplicate == false) {
                this.guide = "확인이 완료되었습니다."
                this.checkNickNameDuplicate = true;
            } else {
                this.guide = "중복된 닉네임입니다."
                this.checkNickNameDuplicate = true;
            }
        },
        handleCheckNickName () {
            if(this.nickName != null && this.checkNickNameDuplicate == false) {
                alert("닉네임 중복 여부를 확인하세요")
            } else if(this.nickName != null && this.checkNickNameDuplicate == true) {
                const { email, name, contactNumber, nickName, birthday } = this
                this.$emit('submit', { email, name, contactNumber, nickName, birthday })
            }
        }
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
@import "../../../assets/styles/fonts.css";
.out-container {
    background-color: rgb(250, 250, 250);
    height: 900px;
    font-family: 'SUIT-Regular';
    color: #282F33;
}
.myProfileContainer {
@media (max-width: 767px) {
    width: 100%;
}
    width: 30%;
    background-color: white;
    padding: 1%;
    height: 900px;
}
.box {
    background-color: rgb(247, 247, 247);
    border-radius: 12px;
    padding: 2%;
    margin-bottom: 6px;
}
.checkNickNameInfo span {
    font-weight: 100;
}
.box input {
    outline: none;
    width: 100%;
    padding-left: 10px;
    font-size: 14px;
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
    padding-left: 10px;
    font-weight: 600;
    color: #616568;
}
.checkValue {
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    margin-left: 8px;
    color: rgb(255, 255, 255);
    margin-bottom: 8px;
}
.submitBtn, .clearBtn {
    border-radius: 12px;
    width: 160px;
    min-height: 40px;
    margin-top: 40px;
    color: white;
    font-size: 13px;
    font-weight: 200;
    margin-left: 6px;
    margin-right: 6px;
}
.clearBtn {
    color: #282F33;
}
Strong {
    font-size: 24px;
    font-weight: 600;
}
.infoBox {
    padding-bottom: 20px;
    padding-top: 20px;
}
.withdrawal {
    font-weight: 200;
    font-size: 12px;
    text-decoration: none;
    color: #535353;
    display: inline-block;
    white-space: nowrap;
    padding-left: 10px;
}
</style>