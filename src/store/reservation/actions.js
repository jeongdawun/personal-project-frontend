import {
    REQUEST_RESERVATION_LIST_TO_SPRING,
    REQUEST_RESERVATION_DETAIL_TO_SPRING
} from './mutation-types'

import router from '@/router'
import axiosInst from '@/utility/axiosInst'

export default {
    requestReservationToSpring ({ }, payload) {
        return axiosInst.post('/reservation/create', payload)
            .then((res) => {
                if(res.data != null) {
                    alert('예약 요청 성공!')
                    return res.data
                } else {
                    alert('예약 실패!')
                }
            })
    },
    requestMemberInfoWithReservationStatusToSpring ({}) {
        return axiosInst.get('/reservation/my-reservations-status')
            .then((res) => {
                if(res.data != null) {
                    return res.data
                } else {
                    alert("문제 발생")
                }
            })
    },
    requestReservationListToSpring ({ commit }) {
        return axiosInst.get('/reservation/my-reservations')
            .then((res) => {
                if(res.data != null) {
                    commit(REQUEST_RESERVATION_LIST_TO_SPRING, res.data);
                    console.log("궁금해 예약리스트: " + JSON.stringify(res.data))
                    return res.data
                } else {
                    alert("조회 실패")
                }
            })
    },
    requestReservationDatailToSpring ({ commit }, id) {
        return axiosInst.get(`/reservation/my-reservation-detail/${id}`)
            .then((res) => {
                if(res.data != null) {
                    commit(REQUEST_RESERVATION_DETAIL_TO_SPRING, res.data);
                    console.log("궁금해 상세 예약 정보: " + JSON.stringify(res.data))
                    return res.data
                } else {
                    alert("조회 실패")
                }
            })
    },
}