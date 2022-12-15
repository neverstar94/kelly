import { httpClient } from "core/interceptors/index";
import { httpClient_check } from "core/interceptors/index_check";

const Checkout = {
    applyCoupon: async (payload) => {
        let httpRequest = await httpClient();
        return httpRequest.post(`/checkout/coupon`, payload);
    },
     removeCoupon: async () => {
        let httpRequest = await httpClient();
        return httpRequest.delete(`/checkout/coupon`);
    },
    removeGiftCart: async (payload) => {
      let httpRequest = await httpClient();
      return httpRequest.post(`/checkout/gift_voucher`,payload);
  },
     
      shippingCost: async (payload) => {
        let httpRequest = await httpClient();
        return httpRequest.post(`/shipping/calculator`, payload);
    },
    GetShipping: async (payload) => {
      let httpRequest = await httpClient();
      return httpRequest.post(`/checkout/shipping_info`, payload);
    },
  //   shippingservice: async (payload) => {
  //     let httpRequest = await httpClient();
  //     return httpRequest.post(`/checkout/shipping_info`, payload);
  // },
    placeorder: async (payload) => {
        let httpRequest = await httpClient();
        return httpRequest.post(`/checkout`, payload);
    },

    shippingfee: async (payload) => {
      let httpRequest = await httpClient();
      return httpRequest.post(`/checkout/shipping_service`, payload);
     },
     paymentselect: async (payload) => {
      let httpRequest = await httpClient();
      return httpRequest.post(`/checkout/payment_type`, payload);
     },
     
    shippingservice: async (payload) => {
      let httpRequest = await httpClient_check();
      return httpRequest.get(`/shipping/services?country_id=${payload.country}&city_id=${payload.city}`);
  },
      
    totalPricing: async () => {
         let httpRequest = await httpClient();
        return httpRequest.get(`/checkout/pricing`);
     },

    gift_wrapping_paper_designs: async () => {
      let httpRequest = await httpClient();
     return httpRequest.get(`/checkout/gift_wrapping_paper_designs`);
    },

};

export default Checkout;
