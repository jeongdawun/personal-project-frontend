import {
    REQUEST_PRODUCT_LIST_TO_SPRING,
    REQUEST_PRODUCT_TO_SPRING,
} from './mutation-types'

import axiosInst from '@/utility/axiosInst'

export default {
    requestProductListToSpring({ commit }) {
        return axiosInst.get('/product/list')
            .then((res) => {
                commit(REQUEST_PRODUCT_LIST_TO_SPRING, res.data);
                console.log("res.data: " + JSON.stringify(res.data))
            });
    },
    requestProductToSpring({ commit }, id) {
        return axiosInst.get(`/product/${id}`)
            .then((res) => {
                console.log("상품 잘 가져오는지 확인: " + JSON.stringify(res.data));
                commit(REQUEST_PRODUCT_TO_SPRING, res.data);
            })
            .catch(() => {
                alert("상품이 존재하지 않습니다.");
            });
    },
}