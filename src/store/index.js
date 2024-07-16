import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state() {
    return {
      carType: 2,
      setPlacePinFrom: null,
      setPlacePinTo: null,
      setDatePin: null,
      lang: null,
      regClick: false,
    };
  },
});
