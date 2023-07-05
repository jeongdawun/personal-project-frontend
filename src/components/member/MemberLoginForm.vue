<template lang="">
    <div>
        <div class="loginFormTop">
            <p>LOGIN</p>
            <hr>
        </div>
        <div class="loginForm">
            <table>
            <td class="item">
                <tr>
                    <td>
                        이메일
                    </td>
                </tr>
                <p></p>
                <tr>
                    <td>
                        비밀번호
                    </td>
                </tr>
            </td>
            <td class="value">
                <tr>
                    <td>
                        <input type="text" class="inputValue" v-model="email">
                    </td>
                </tr>
                <p></p>
                <tr>
                    <td>
                        <input type="text" class="inputValue" v-model="password">
                    </td>
                </tr>
            </td>
            <div>
                <button class="loginButton" @click="onSubmit">로그인</button>
            </div>
            </table>
        </div>
        <div class="loginFormBottom">
            <hr>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        onSubmit () {
            const { email, password } = this
            this.$emit('submit', { email, password })
        }
    }
}
</script>

<style scoped>
@import "../../assets/styles/fonts.css";
.loginFormTop p{
    text-align: center;
    font-family: 'GmarketSans';
    font-weight: 200;
    font-size: 40px;
    padding-top: 20px;
}
.loginFormBottom {
    padding: 60px;
}
.loginFormTop {
    padding: 60px;
}
hr {
    width: 40%;
    margin-left : auto;
    margin-right : auto;
}
ul {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    background-color: rgb(247, 247, 247);
    height: 46px; 
}
.loginForm {
    width: 50%;
    margin-left : auto;
    margin-right : auto;
    align-items: center;
    font-family: 'GmarketSans';
    font-weight: 200;
    padding-left: 180px;
}
.item {
    font-weight: 300;
    color: rgb(177, 177, 177);
    padding-right: 40px;
    width: 20%
}
.value td{
    color: rgb(177, 177, 177);
    background-color: rgb(238, 238, 238);
    width: 360px;
}
td {
    height: 28px;
}
.inputValue {
    border: none;
    outline: none;
    font-size: 12px;
    padding-left: 10px;
}
.loginButton {
    background-color: #73916A;
    color: white;
    height: 78px;
    display: inline-flex;
    width: 80px;    
}
</style>