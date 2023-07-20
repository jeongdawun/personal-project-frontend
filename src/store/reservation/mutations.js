import {
  REQUEST_RESERVATION_LIST_TO_SPRING,
} from "./mutation-types";

export default {
  [REQUEST_RESERVATION_LIST_TO_SPRING](state, receivedData) {
    state.reservations = receivedData;
  },
};