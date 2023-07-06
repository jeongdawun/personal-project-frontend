import router from '@/router'
import axiosInst from '@/utility/axiosInst'

export default {
    requestLoginMemberToSpring ({ }, { email, password }) {
        return axiosInst.post('/member/login', { email, password })
            .then((response) => {
                const receivedToken = response.headers.get("Authorization")

                const accessToken = receivedToken.split(' ')[1];
                const refreshToken = receivedToken.split(' ')[2];

                console.log("accessToken: " + accessToken);
                console.log("refreshToken: " + refreshToken);

                sessionStorage.setItem("accessToken", accessToken);
                sessionStorage.setItem("refreshToken", refreshToken);

                alert('로그인되었습니다.')
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
    requestCheckEmailDuplicate ({ }, payload) {
        
        return axiosInst.post('member/check-email-duplicate', payload)
        .then((res) => {
            if(res.data == true) {
                return res.data
            } else {
                return res.data
            }
        })
    }
}