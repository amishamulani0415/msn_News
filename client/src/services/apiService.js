import axios from "axios";

const apiEndpoint =
  import.meta.env.VITE_API_ENDPOINT || "http://localhost:8000/api/v1/msnclone";

const apiService = {
  getCall: async (apiPath) => {
    try {
      const response = await axios.get(`${apiEndpoint}${apiPath}`);
      return response.data;
    } catch (error) {
      console.error("Error in Fetching...!", error);
      return false;
    }
  },

  // postCall: async (apiPath, payload) => {
  //   try {
  //     let token = Cookies.get("jwt_token");
  //     let headers = {};

  //     if (token && apiPath !== "/login") {
  //       headers.Authorization = "Bearer " + token;
  //     }

  //     if (payload instanceof FormData) {
  //       headers["Content-Type"] = "multipart/form-data";
  //     }

  //     const response = await axios.post(`${apiEndpoint}${apiPath}`, payload, {
  //       headers: headers,
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error in Creating...!", error);
  //     return false;
  //   }
  // },

  //   postCall: async (apiPath, payload) => {
  //     try {
  //         let token = Cookies.get("jwt_token");
  //         let headers = {};

  //         // Include Authorization header only if the token exists
  //         if (token) {
  //             headers.Authorization = "Bearer " + token;
  //         }

  //         // Set Content-Type for FormData payloads
  //         if (payload instanceof FormData) {
  //             headers["Content-Type"] = "multipart/form-data";
  //         }

  //         // Make the POST request
  //         const response = await axios.post(`${apiEndpoint}${apiPath}`, payload, {
  //             headers: headers,
  //         });

  //         // Return the API response
  //         return response.data;
  //     } catch (error) {
  //         console.error("Error in Creating...!", error);
  //         return false;
  //     }
  // },

  //   putCall: async (apiPath, payload) => {
  //     try {
  //       let token = Cookies.get("jwt_token");
  //       let headers = {};

  //       if (token) {
  //         headers.Authorization = "Bearer " + token;
  //       }

  //       if (payload instanceof FormData) {
  //         headers["Content-Type"] = "multipart/form-data";
  //       }

  //       const response = await axios.put(`${apiEndpoint}${apiPath}`, payload, {
  //         headers: headers,
  //       });
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error in Updating...!", error);
  //       return false;
  //     }
  //   },

  //   patchCall: async (apiPath, payload) => {
  //     try {
  //       let token = Cookies.get("jwt_token");
  //       let headers = {};

  //       if (token) {
  //         headers.Authorization = "Bearer " + token;
  //       }

  //       if (payload instanceof FormData) {
  //         headers["Content-Type"] = "multipart/form-data";
  //       }

  //       const response = await axios.patch(`${apiEndpoint}${apiPath}`, payload, {
  //         headers: headers,
  //       });
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error in Updating...!", error);
  //       return false;
  //     }
  //   },

  //   deleteCall: async (apiPath) => {
  //     try {
  //       let token = Cookies.get("jwt_token");

  //       if (token) {
  //         const headers = {
  //           Authorization: "Bearer " + token,
  //         };
  //         const response = await axios.delete(`${apiEndpoint}${apiPath}`, {
  //           headers: headers,
  //         });
  //         return response.data;
  //       } else {
  //         return false;
  //       }
  //     } catch (error) {
  //       console.error("Error in Deleting...!", error);
  //       return false;
  //     }
  //   },
};

export default apiService;
