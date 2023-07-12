import {
    REQUEST_PRODUCT_LIST_TO_SPRING,
    REQUEST_PRODUCT_TO_SPRING,
} from './mutation-types'

import axiosInst from '@/utility/axiosInst'

export default {
    requestRegisterProductToSpring ({}, payload) {
        const { productName, category, productDetails, city, street, addressDetail, zipcode, mainImageName, imageNameList, optionNameList, optionPriceList } = payload

        return axiosInst.post('/product/register', 
        { productName, category, productDetails, city, street, addressDetail, zipcode, mainImageName, imageNameList, optionNameList, optionPriceList })
            .then((res) => {
                if(res.data == true) {
                    alert("상품 등록 성공!")
                } else {
                    alert("상품 등록 실패")
                }
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
    requestProductListToSpring({ commit }) {
        return axiosInst.get('/product/list')
            .then((res) => {
                commit(REQUEST_PRODUCT_LIST_TO_SPRING, res.data);
                console.log("res.data: " + JSON.stringify(res.data))
            });
    },
    requestProductListByCategoryToSpring({ commit }, category) {
        return axiosInst.get(`/product/category/${category}`)
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
    requestStockToSpring({ }, { id, checkInDate, checkOutDate }) {
        return axiosInst.post('/product/check-stock', { id, checkInDate, checkOutDate })
        .then((res) => {
            return res.data
        })
    }
}