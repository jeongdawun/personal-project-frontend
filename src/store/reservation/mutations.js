import {
  REQUEST_RESERVATION_LIST_TO_SPRING,
  REQUEST_RESERVATION_DETAIL_TO_SPRING
} from "./mutation-types";

export default {
  [REQUEST_RESERVATION_LIST_TO_SPRING](state, receivedData) {
    state.reservations = receivedData;
  },
  [REQUEST_RESERVATION_DETAIL_TO_SPRING](state, receivedData) {
    state.reservation = receivedData;
  },
};