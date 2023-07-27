<template lang="">
    <div class="notice">
        <h2>탈퇴 안내</h2>
        <span>회원 탈퇴를 신청하기 전에 안내 사항을 꼭 확인해주세요.</span>
        <div class="infomenu">
            <span class="mdi mdi-checkbox-marked-outline">
                <strong> 사용하고 계신 아이디는 탈퇴할 경우 재사용 및 복구가 불가합니다.</strong>
            </span><br>
            <p class="details">탈퇴한 아이디는 본인과 타인 모두 재사용 및 복구가 불가하오니 신중하게 선택하시기 바랍니다.</p>
        </div>
        <div class="infomenu">
            <span class="mdi mdi-checkbox-marked-outline">
                <strong> 아래 데이터는 탈퇴 즉시 삭제됩니다.</strong>
            </span><br>
            <p class="details">- 회원 정보</p>
            <p class="details">- 예약 및 구매내역</p>
        </div>
        <div class="infomenu">
            <span class="mdi mdi-checkbox-marked-outline">
                <strong> 등록된 이용 후기는 자동으로 삭제되지 않습니다.</strong>
            </span><br>
            <p class="details">탈퇴 전 개별적으로 삭제해주세요.</p>
        </div>
        <div class="final">
            <!-- <v-alert
            dense
            text
            color=red
            >
            탈퇴 후에는 아이디 <strong>{{ this.userEmail }}</strong> 로 다시 가입할 수 없으며 아이디와 데이터는 <strong>복구</strong>할 수 없습니다.
            </v-alert> -->
            <v-checkbox
              v-model="agree"
              label="안내 사항을 모두 확인하였으며, 이에 동의합니다."
              color="red darken-3"
              hide-details
            ></v-checkbox>
        </div>
        <v-text-field v-model="password" label="비밀번호" 
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                color="red"></v-text-field>
        <div class="btnmenu">
            <v-col cols="auto">
            <v-btn class="submitBtn" color="black" elevation="0" @click="withdrawalBtn">탈퇴하기</v-btn>
            <v-btn class="clearBtn" elevation="0" @click="clear">다음에 할래요!</v-btn>
        </v-col>
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
            show1: false,
            password: '',   
            agree: false
        }
    },
    methods: {
        ...mapActions(memberModule, ['requestNormalMemberWithdrawalToSpring']),
        async withdrawalBtn () {
            if(this.agree == true && this.password != null) {
                const password = this.password
                await this.requestNormalMemberWithdrawalToSpring(password)
            }
            if(this.agree == false && this.password != null) {
                alert("동의 항목에 체크해주세요.")
            }
            if(this.agree == true && this.password === '') {
                alert("비밀번호를 입력해주세요.")
            }
        },
        clear () {
            router.push('/')
        },
    }
}
</script>

<style scoped>
h2 {
    padding-top: 90px;
    padding-bottom: 10px;
    font-size: 28px;
    font-family: 'SUIT-Regular';
}
.final {
    padding-bottom: 20px;
}
.notice {
    width: 50%;
    margin: auto;
    font-family: 'SUIT-Regular';
}
.details {
    padding-left: 20px;
    margin-top: 10px;
}
.infomenu {
    background-color: white;
    padding-top: 40px;
    padding-bottom: 20px;
}
.submitBtn {
    color: white;
    font-family: 'SUIT-Regular';
    font-size: 14px;
    font-weight: 200;
    margin-left: 10px;
    margin-right: 10px;
}
.clearBtn {
    font-family: 'SUIT-Regular';
    font-size: 14px;
    font-weight: 200;
    margin-left: 10px;
    margin-right: 10px;
}
.btnmenu {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}
</style>