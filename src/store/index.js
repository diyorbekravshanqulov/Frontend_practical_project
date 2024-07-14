import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state() {
    return {
      setPlacePinFrom: null,
      setPlacePinTo: null,
      lang: null,
      regClick: false, 
    };
  },
});
