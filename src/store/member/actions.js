import router from '@/router'
import axiosInst from '@/utility/axiosInst'

export default {
    requestCheckEmailDuplicate ({ }, email) {

        return axiosInst.get('member/check-email-duplicate', { params: { email: email }})
            .then((res) => {
                return res.data
            })
    },
    requestCheckBusinessNumberDuplicate ({ }, businessNumber) {

        return axiosInst.get('member/check-businessNumber-duplicate', { params: { businessNumber: businessNumber }})
            .then((res) => {
                return res.data
            })
    },
    requestCheckNickNameDuplicate ({ }, nickName) {

        return axiosInst.get('member/check-nickName-duplicate', { params: { nickName: nickName }})
            .then((res) => {
                return res.data
            })
    },
    requestAuthorizeEmailToSpring ({ }, email) {

        return axiosInst.get('/member/check-email-authorize', { params: { email: email }})
            .then((res) => {
                if(res.data > 0) {
                    return res.data
                } else {
                    alert('이메일 인증이 정상적으로 완료되지 않았습니다.')
                }
            })
    },
    requestNormalMemberSignupToSpring ({ }, payload) {

        return axiosInst.post('/member/signup-normal', payload)
            .then((res) => {
                if(res.data) {
                    router.push('/login')
                } else {
                    alert('회원가입이 정상적으로 완료되지 않았습니다.')
                }
            })
    },
    requestBusinessMemberSignupToSpring ({ }, payload) {

        return axiosInst.post('/member/signup-business', payload)
            .then((res) => {
                if(res.data) {
                    router.push('/login')
                } else {
                    alert('회원가입이 정상적으로 완료되지 않았습니다.')
                }
            })
    },
    requestLoginMemberToSpring ({ }, payload) {

        return axiosInst.post('/member/login', payload)
            .then(async(res) => {
                if(res.data) {
                    const cookieString = document.cookie
                    const cookies = cookieString.split(';')
    
                    for (let i = 0; i < cookies.length; i++) {
                        const cookie = cookies[i].trim()
    
                        const separatorIndex = cookie.indexOf('=')
                        const name = cookie.substring(0, separatorIndex)
                    
                        if (name === "AccessToken") {
                            localStorage.setItem("isLogin", true)
                        }
                    }
                    await router.push('/')
                    location.reload()
                } else {
                    alert('이메일 및 비밀번호를 다시 확인해주세요.')
                }
            })
    },
    requestMemberLogoutToSpring ({ }) {

        return axiosInst.get('/member/logout')
            .then((res) => {
                if(res.data == true) {
                    localStorage.setItem("isLogin", false)
                } else {
                    alert('로그아웃이 정상적으로 완료되지 않았습니다.')
                }
            })
    },
    requestAuthorizeForUserProfileToSpring ({ }) {

        return axiosInst.get('/member/auth-userProfile')
            .then((res) => {
                if(res.data != null) {
                    return res.data
                } else {
                    alert('회원 프로필을 정상적으로 가져오지 못했습니다.')
                }
            })
    },
    requestAuthorizeForSellerInfoToSpring ({ }) {

        return axiosInst.get('/member/auth-sellerInfo')
            .then((res) => {
                if(res.data != null) {
                    return res.data
                } else {
                    alert('판매자 프로필을 정상적으로 가져오지 못했습니다.')
                }
            })
    },
    requestRegisterProfileToSpring ({ }, payload) {

        return axiosInst.post('/member/profile-register', payload)
            .then((res) => {
                if(res.data == true) {
                    location.reload()
                    return res.data
                } else {
                    alert('회원 프로필 등록이 정상적으로 완료되지 않았습니다.')
                }
            })
    },
    requestRegisterSellerInfoToSpring ({ }, payload) {

        return axiosInst.post('/member/sellerInfo-register', payload)
            .then((res) => {
                if(res.data == true) {
                    location.reload()
                    return res.data
                } else {
                    alert('고객센터 정보 등록이 정상적으로 완료되지 않았습니다.')
                }
            })
    },
    requestNormalMemberWithdrawalToSpring ({ }, password) {

        return axiosInst.post('/member/withdrawal', { password: password })
            .then((res) => {
                if(res.data == true) {
                    alert('회원 탈퇴가 완료되었습니다.')
                    localStorage.setItem("isLogin", false)
                    router.push('/')
                } else {
                    alert('회원탈퇴가 정상적으로 완료되지 않았습니다.')
                }
            })
    },
    requestCheckRoleToSpring () {

        return axiosInst.get('/member/check-role')
            .then((res) => {
                if(res.data != null) {
                    return res.data
                } else {
                    alert('권한 확인이 정상적으로 처리되지 않았습니다.')
                }
            })
    },
}