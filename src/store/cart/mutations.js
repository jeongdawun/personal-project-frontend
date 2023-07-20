import {
  REQUEST_CART_LIST_TO_SPRING,
} from "./mutation-types";

export default {
  [REQUEST_CART_LIST_TO_SPRING](state, receivedData) {
    state.cartItems = receivedData;
  },
};