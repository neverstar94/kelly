import { baseURL } from "core/constants/index";
import axios from "axios";
import { removeToken, setToken } from "core/indentity/index";
import { httpClient } from "core/interceptors/index";
const Auth = {

    login: async (payload) => {
        let response = await axios.post(`${baseURL}/auth/login`, payload);
        return response;
    },

    socialLogin: async (payload) => {
        let response = await axios.post(`${baseURL}/social/login`,payload);
        return response;
    },
    resetPass : async (payload) => {
        let response = await axios.post(`${baseURL}/password/request_reset`,payload);
        return response;

    },
    pinverify : async (payload) => {
        let response = await axios.post(`${baseURL}/password/pin/verify`,payload);
        return response;

    },
    resetpassword : async (payload) => {
        let response = await axios.post(`${baseURL}/password/reset`,payload);
        return response;

    },
    register: async (payload) => {

        let response = await axios.post(`${baseURL}/auth/register`, payload);
        return response;

    },
    social: async (payload) => {

        let response = await axios.post(`${baseURL}/auth/social/register`, payload);
        return response;
    },

    logout: async () => {
        removeToken();
    },

    refresh: async (payload) => {
        let response = await axios.post(`${baseURL}/token/refresh`, payload);
        return response;
    },
    me: async () => {
        let httpRequest = await httpClient();
        let response = await httpRequest.get(`/account/profile`);
        return response;
    }


}

export default Auth;