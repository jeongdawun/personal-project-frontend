import router from '@/router'
import axiosInst from '@/utility/axiosInst'

export default {
    requestReservationToSpring ({ }, payload) {
        return axiosInst.post('/reservation/create', payload)
            .then((res) => {
                if(res.data == true) {
                    alert('예약이 완료되었습니다.')
                    router.push('/')
                } else {
                    alert('예약 실패!')
                }
            })
    },
}