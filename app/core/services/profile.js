import { baseURL } from "core/constants/index";
import { httpClient } from "core/interceptors/index";
const Profile = {
  address: async () => {
    let httpRequest = await httpClient();
    try {
      let response = await httpRequest.get(`${baseURL}/account/addresses`);
      return response;
    } catch (error) {
      return error;
    }
  },

  default: async (id) => {
    let httpRequest = await httpClient();
    try {
      let response = await httpRequest.post(
        `${baseURL}/account/addresses/${id}/default`
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  
    imgupdate: async (payload) => {
      let httpRequest = await httpClient();
      try {
        let response = await httpRequest.post(
          `${baseURL}/account/profile/image`,payload);
        return response;
      } catch (error) {
        return error;
      }
    },

     create: async (payload) => {
    let httpRequest = await httpClient();
    try {
      let response = await httpRequest.post(
        `${baseURL}/account/addresses`,
        payload,
      );
      return response;
    } catch (error) {
      return error;
    }
  },

   delete: async (id) => {
    let httpRequest = await httpClient();
    try {
      let response = await httpRequest.delete(
        `${baseURL}/account/addresses/${id}`
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  wishlist: async () => {
    let httpRequest = await httpClient();
    try {
      let response = await httpRequest.get(`${baseURL}/account/wishlist`);
      return response;
    } catch (error) {
      return error;
    }
  },
  orders: async () => {
    let httpRequest = await httpClient();
    try {
      let response = await httpRequest.get(`${baseURL}/account/orders?page=1&per_page=1000`,);
      return response;
    } catch (error) {
      return error;
    }
  },
  points: async () => {
    let httpRequest = await httpClient();
    try {
      let response = await httpRequest.get(`${baseURL}/account/points`);
      return response;
    } catch (error) {
      return error;
    }
  },
  update: async (payload) => {
    let httpRequest = await httpClient();
    try {
      let response = await httpRequest.post(
        `${baseURL}/account/profile`,
        payload
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  //payload = product_ids = [];
  wishlistAdd: async (payload) => {
    let httpRequest = await httpClient();
    try {
      let response = await httpRequest.post(
        `${baseURL}/account/wishlist/${payload}`
      );
      return response;
    } catch (error) {
      return error;
    }
  },

  wishlistRemove: async (payload) => {
    let httpRequest = await httpClient();
    try {
      let response = await httpRequest.delete(
        `${baseURL}/account/wishlist/${payload}`
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  wishlistClear: async () => {
    let httpRequest = await httpClient();
    try {
      let response = await httpRequest.delete(
        `${baseURL}/account/wishlist/clear`
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  newsletter: async (payload) => {
    let httpRequest = await httpClient();
    try {
      let response = await httpRequest.post(
        `${baseURL}/account/newsletters/subscribe`,payload
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  add_address: async (payload) => {
    let httpRequest = await httpClient();
    try {
      let response = await httpRequest.post(
        `${baseURL}/account/address`,payload
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  edit_address: async (payload,e) => {
    let httpRequest = await httpClient();
    try {
      let response = await httpRequest.post(
        `${baseURL}/account/addresses/${e}`,payload
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  confirmreceipt: async (e) => {
    let httpRequest = await httpClient();
    try {
      let response = await httpRequest.post(
        `${baseURL}/account/orders/${e}/confirm`,
      );
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default Profile;