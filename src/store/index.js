import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state() {
    return {
      carType: 2,
      setPlacePinFrom: null,
      setPlacePinTo: null,
      setDatePin: null,
      lang: "uz",
      regClick: false,
      location: false,
      token: localStorage.getItem("access_token"),
      calen: false,
      confirm: false,
      driver_data: null,
      user_datas: null,
      dr_update: false,
    };
  },
});
