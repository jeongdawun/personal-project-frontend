import router from '@/router'
import axiosInst from '@/utility/axiosInst'

export default {
    requestLoginMemberToSpring ({ }, { email, password }) {
        return axiosInst.post('/member/login', { email, password })
            .then((res) => {
                console.log("궁금쓰 res: " + res.data)
                if(res.data == true) {
                    const cookieString = document.cookie;
                    const cookies = cookieString.split(';');
                    console.log("궁금해: " + cookies)
    
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = cookies[i].trim();
    
                        var separatorIndex = cookie.indexOf('=');
                        var name = cookie.substring(0, separatorIndex);
                    
                        if (name === "AccessToken") {
                            localStorage.setItem("isLogin", true)
                        }
                    }
                    alert('로그인되었습니다.')
                    router.push('/')
                } else {
                    alert('이메일 및 비밀번호를 다시 확인해주세요.')
                }
            })
            .catch(() => {
                alert('이메일 및 비밀번호를 다시 확인해주세요.')
            })
    },
    requestMemberLogoutToSpring ({ }) {

        return axiosInst.post('/member/logout')
            .then((res) => {
                localStorage.setItem("isLogin", false)
                alert("로그아웃")
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
    requestNormalMemberWithdrawToSpring ({ }, password) {

        return axiosInst.get('/member/withdraw', { params: { password: password }})
            .then((res) => {
                if(res.data == true) {
                    alert('회원탈퇴가 완료되었습니다.')
                    localStorage.setItem("isLogin", false)
                    router.push('/')
                    location.reload()
                } else {
                    alert('회원탈퇴 실패!')
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
    requestAuthorizeToSpring ({}) {
        return axiosInst.post('/member/auth')
            .then((res) => {
                if(res.data != null) {
                    return res.data
                } else {
                    alert("문제 발생")
                }
            })
    },
    requestAuthorizeForUserProfileToSpring ({}) {
        return axiosInst.post('/member/auth-userProfile')
            .then((res) => {
                if(res.data != null) {
                    return res.data
                } else {
                    alert("문제 발생")
                }
            })
    },
    requestAuthorizeForSellerInfoToSpring ({}) {
        return axiosInst.post('/member/auth-sellerInfo')
            .then((res) => {
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