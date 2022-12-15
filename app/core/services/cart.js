import { httpClient} from "core/interceptors/index";
import {fileUploadClient} from "core/interceptors/indexupload";
const Cart = {
    add: async (payload) => {
        let httpRequest = await httpClient();
        return httpRequest.post(`/cart/add`, payload);
    },
    video: async (payload) => {
        let fileRequest = await fileUploadClient();

        return fileRequest.post(`/cart/gift_card/video`, payload);
    },

    remove: async ( row_id ) => {
        let httpRequest = await httpClient();
        return httpRequest.post(`/cart/${row_id}/remove`);
    },
    update: async ({ row_id, payload }) => {
        let httpRequest = await httpClient();
        return httpRequest.post(`/cart/${row_id}/update`, payload);
    },

    clear: async () => {
        let httpRequest = await httpClient();
        return httpRequest.post(`/cart/clear`);
    },

    get: async () => {
        let httpRequest = await httpClient();
        const response = httpRequest.get(`/cart`);
        return response;
    },



}

export default Cart;