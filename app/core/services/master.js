import axios from "axios";
import { baseURL } from "core/constants/index";
import { httpClient } from "core/interceptors/index";
const Master = {
    getShipping: async (
        {country_id, city_id}
    ) => {
        let response = await axios.get(`${baseURL}/shipping/services?country_id=${country_id}&city_id=${city_id}`);
        console.log(response);
        return response;
    },
    getCounties: async () => {
        let response = await axios.get(`${baseURL}/countries`);
        return response;
    },
    getCurrencies: async () => {
        let response = await axios.get(`${baseURL}/currencies`);
        return response;
    },

    getPaymentTypes: async () => {
        let response = await axios.get(`${baseURL}/payment/types`);
        return response;
    },

    getCategories: async () => {
        let response = await axios.get(`${baseURL}/categories`);
        return response;
    },

    getBanners: async (page) => {
        let response = await axios.get(`${baseURL}/banners?page=${page}`);
        return response;
    },

    getBranches: async () => {
        let response = await axios.get(`${baseURL}/branches`);
        return response;
    },
    getContact: async () => {
        let response = await axios.get(`${baseURL}/contact_info`);
        return response;
    },

    postInquiry: async (payload) => {
         let httpRequest = await httpClient();
        let response = await httpRequest.post(`${baseURL}/inquiry`, payload);
        return response;
    }
}

export default Master;
