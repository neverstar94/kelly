import axios from "axios";
import { baseURL } from "core/constants/index";
import { getToken } from "core/indentity/index";


const axiosRequest = axios.create({
    baseURL: baseURL,
    timeout: 50000,
});
export const fileUploadClient = async () => {
  const token = await getToken();
  axiosRequest.interceptors.request.use(
      (config) => {
          if (getToken()) {
              config.headers["Authorization"] = `Bearer ${token}`;
          }
          config.headers["Content-Type"] = "multipart/form-data";
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
         
      }
  );
  return axiosRequest;
}