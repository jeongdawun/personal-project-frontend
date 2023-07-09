import router from '@/router'
import axiosInst from '@/utility/axiosInst'

export default {
    requestLoginMemberToSpring ({ }, { email, password }) {
        return axiosInst.post('/member/login', { email, password })
            .then((response) => {
                const receivedToken = response.headers.get("Authorization")

                const accessToken = receivedToken.split(' ')[1];
                console.log("accessToken: " + accessToken);

                sessionStorage.setItem("accessToken", accessToken);

                alert('로그인되었습니다.')
                router.push('/')
            })
            .catch(() => {
                alert('로그인이 실패하였습니다.')
            })
    },
    requestNormalMemberSignupToSpring ({ }, payload) {

        return axiosInst.post('/member/signup-normal', payload)
            .then((res) => {
                if(res.data == true) {
                    alert('일반 회원 가입 성공')
                    router.push('/login')
                } else {
                    alert('회원가입 실패!')
                }
            })
    },
    requestBusinessMemberSignupToSpring ({ }, payload) {

        return axiosInst.post('/member/signup-business', payload)
            .then((res) => {
                if(res.data == true) {
                    alert('사업자 회원 가입 성공')
                    router.push('/login')
                } else {
                    alert('회원가입 실패!')
                }
            })
    },
    requestCheckEmailDuplicate ({ }, payload) {

        return axiosInst.post('member/check-email-duplicate', payload)
        .then((res) => {
            if(res.data == true) {
                return res.data
            } else {
                return res.data
            }
        })
    },
    requestCheckBusinessNumberDuplicate ({ }, payload) {

        return axiosInst.post('member/check-businessNumber-duplicate', payload)
        .then((res) => {
            if(res.data == true) {
                return res.data
            } else {
                return res.data
            }
        })
    },
    requestCheckNickNameDuplicate ({ }, payload) {

        return axiosInst.post('member/check-nickName-duplicate', payload)
        .then((res) => {
            if(res.data == true) {
                return res.data
            } else {
                return res.data
            }
        })
    },
    requestAuthorizeToSpring ({}, payload) {
        return axiosInst.post('/member/auth', payload)
            .then((res) => {
                if(res.data != null) {
                    return res.data
                } else {
                    alert("문제 발생")
                }
            })
    },
    requestAuthorizeForUserProfileToSpring ({}, payload) {
        return axiosInst.post('/member/auth-userProfile', payload)
            .then((res) => {
                if(res.data != null) {
                    return res.data
                } else {
                    alert("문제 발생")
                }
            })
    },
    requestAuthorizeForSellerInfoToSpring ({}, payload) {
        return axiosInst.post('/member/auth-sellerInfo', payload)
            .then((res) => {
                console.log("궁금해 액션 잘 하는지: " + JSON.stringify(res.data))
                if(res.data != null) {
                    return res.data
                } else {
                    alert("문제 발생")
                }
            })
    },
    requestAuthorizeEmailToSpring ({}, payload) {
        return axiosInst.post('/member/check-email-authorize', payload)
            .then((res) => {
                if(res.data > 0) {
                    return res.data
                } else {
                    alert("문제 발생")
                }
            })
    },
    requestRegisterProfileToSpring ({}, payload) {
        return axiosInst.post('/member/profile-register', payload)
            .then((res) => {
                if(res.data == true) {
                    router.push('/')
                    return res.data
                } else {
                    alert("문제 발생")
                }
            })
    },
    requestRegisterSellerInfoToSpring ({}, payload) {
        return axiosInst.post('/member/sellerInfo-register', payload)
            .then((res) => {
                if(res.data == true) {
                    router.push('/')
                    return res.data
                } else {
                    alert("문제 발생")
                }
            })
    },
}