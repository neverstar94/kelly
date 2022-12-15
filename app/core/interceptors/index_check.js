import axios from "axios";
import { baseURL } from "core/constants/index";
import { getToken } from "core/indentity/index";


const axiosRequest = axios.create({
    baseURL: baseURL,
    timeout: 50000,
});
export const httpClient_check = async () => {
    const token = await getToken();
    axiosRequest.interceptors.request.use(
        (config) => {
            if (getToken()) {
                config.headers["Authorization"] = `Bearer ${token}`;
                config.headers["X-Authorization"] ="X-Authorization";
            }
            config.headers["Accept"] = "*/*";
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    axiosRequest.interceptors.response.use(
        function (response) {
            return response;
        },

        function (error) {
            return Promise.reject(error);
            //enable this for refresh-token handling
            // let { config } = error;

            // if (error.response.status === 401 && !refreshCall) {
            //   refreshCall = true;
            //   axiosClient()
            //     .post("/refreshToken", {
            //       refreshToken: getRefreshToken(),
            //     })
            //     .then(() => {
            //       //handle the config
            //       return httpAuth(config);
            //     })
            //     .catch(() => {
            //       //handle error
            //     });
            // }
        }
    );
    return axiosRequest;
}



