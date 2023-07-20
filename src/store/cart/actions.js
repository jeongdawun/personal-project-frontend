import {
    REQUEST_CART_LIST_TO_SPRING,
} from './mutation-types'

import axiosInst from '@/utility/axiosInst'

export default {
    requestCartItemListToSpring ({ commit }) {
        return axiosInst.get('/cart/myCart')
            .then((res) => {
                if(res.data != null) {
                    commit(REQUEST_CART_LIST_TO_SPRING, res.data);
                    console.log("궁금해 장바구니 리스트: " + JSON.stringify(res.data))
                    return res.data
                } else {
                    alert("조회 실패")
                }
            })
    },
}