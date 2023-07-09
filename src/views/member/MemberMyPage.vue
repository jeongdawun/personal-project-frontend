<template lang="">
    <div>
        <div class="myPageheader">
            <h2>MY PAGE</h2>
            <h4><strong>{{ this.email }}</strong> 님 안녕하세요.</h4>
        </div>
        <div class="myPageMenu">
            <ul>
                <li v-if="this.role === 'NORMAL'">
                    <a href="/myProfilePage">나의정보관리</a>
                </li>
                <li v-if="this.role === 'BUSINESS'">
                    <a href="/sellerInfoPage">파트너정보관리</a>
                </li>
                <li> | </li>
                <li v-if="this.role === 'NORMAL'">
                    <a href="/myOrderPage">나의주문내역</a>
                </li>
                <li v-if="this.role === 'BUSINESS'">
                    <a href="/myProductList">나의상품목록</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

const memberModule = 'memberModule'

export default {
    data () {
        return {
            email: '',
            role: '',
            // response: { email: '', whatIsYourType: false },
            memberInfo: {accountId: -1, roleType: ''},
        }
    },
    components: {
    },
    methods: {
        ...mapActions(memberModule, ['requestAuthorizeToSpring', 'requestMemberIdToSpring']),
    },
    async mounted() {
        this.userToken = sessionStorage.getItem("accessToken")
        this.response = await this.requestAuthorizeToSpring({authorizationHeader: this.userToken})
        console.log("reponse: " + JSON.stringify(this.response))
        this.email = this.response.email
        this.role = this.response.role.roleType
    },
}
</script>

<style scoped>
.myPageheader h2 {
    text-align: center;
    font-weight: lighter;
    padding-block: 20px;
    margin-top: 60px;
}
.myPageheader h4 {
    text-align: center;
    font-weight: lighter;
    padding-block: 20px;
}
.myPageMenu ul {
    display: flex;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    background-color: rgb(247, 247, 247);
    height: 46px;
}
.myPageMenu li {
    display: block;
    width: 20%;
    text-align:center;
    font-weight: lighter;
    font-size: 14px;
    color: rgb(109, 109, 109);
    padding-top: 12px;
}
.productListFormContainer {
    position: fixed;
    top: 29%;
    left: 0;
    width: 100%;
    height: 500px;
    background-color: white; 
}
a {
    text-decoration: none;
    display: inline-block;
    white-space: nowrap;
    color: #000000;
    font-weight: 200;
    font-family: 'GmarketSans';
}
</style>