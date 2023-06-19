import ApiManager from "../api_manger/ApiManager";

export const FetchPostRequest = async (url,data) => {
    try {
      const result = await ApiManager(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      });
      return result;
    } catch (err) {
      return err.response.data;
    }
  };