import {
    REQUEST_PRODUCT_LIST_TO_SPRING,
    REQUEST_PRODUCT_TO_SPRING,
} from './mutation-types'

import axiosInst from '@/utility/axiosInst'
import router from '@/router';

export default {
    requestRegisterProductToSpring ({}, payload) {
        const { productName, category, productDetails, address, facilityType, mainImageName, imageNameList, optionNameList, optionPriceList, optionsRegisterRequestFormList } = payload

        return axiosInst.post('/product/register', 
        { productName, category, productDetails, address, facilityType, mainImageName, imageNameList, optionNameList, optionPriceList, optionsRegisterRequestFormList })
            .then((res) => {
                if(res.data == true) {
                    alert("상품 등록 성공!")
                    router.push('/Mylist')
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
    requestProductTop8ListToSpring({ commit }) {
        return axiosInst.get('/product/topList')
            .then((res) => {
                commit(REQUEST_PRODUCT_LIST_TO_SPRING, res.data);
            });
    },
    requestMyProductToSpring({ }) {
        return axiosInst.get('/product/myList')
            .then((res) => {
                console.log("res.data: " + JSON.stringify(res.data))
                return res.data
            });
    },
    requestProductListByCategoryToSpring({ commit }, category) {
        return axiosInst.get(`/product/category/${category}`)
            .then((res) => {
                commit(REQUEST_PRODUCT_LIST_TO_SPRING, res.data);
                console.log("res.data: " + JSON.stringify(res.data))
            });
    },
    requestProductListByKeywordToSpring({ commit }, keyword) {
        return axiosInst.get(`/product/search/${keyword}`)
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
    },
    requestStockByMapToSpring({ }, { checkInDate, checkOutDate }) {
        console.log("입력받은 날짜: " + checkInDate + " " + checkOutDate)
        return axiosInst.post('/product/map-vacancy', { checkInDate, checkOutDate })
        .then((res) => {
            console.log("서버 응답: " + JSON.stringify(res.data))
            return res.data
        })
    },
    requestDeleteProductToSpring({ }, id) {
        return axiosInst.delete(`/product/${id}`)
        .then((res) => {
            if(res.data == true) {
                alert("상품 삭제가 완료되었습니다.")
                router.push('/myPage')
            } else {
                alert("예약 내역이 존재하여 상품을 삭제할 수 없습니다.")
            }
        })
        .catch(() => {
            alert('통신 실패')
        })
    },
    requestModifyProductToSpring({ }, { id, productDetails, imageNameList, optionNameList, optionPriceList, optionModifyRequestFormList }) {
        return axiosInst.put(`/product/${id}`, { productDetails, imageNameList, optionNameList, optionPriceList, optionModifyRequestFormList })
            .then((res) => {
                if(res.data == true) {
                    alert("상품이 성공적으로 수정되었습니다.")
                    router.push(`/product/${id}`)
                } else {
                    alert("상품 수정 실패")
                }
            })
            .catch(() => {
                alert("통신 실패");
            });
    }
}