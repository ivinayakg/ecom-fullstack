import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
  headers: {
    authorization: localStorage.getItem("token") ?? "",
  },
});

export const GetData = async (url, options = {}) => {
  try {
    let res = await instance.get(url, options);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const PostData = async (url, payload, options = {}) => {
  try {
    let res = await instance.post(url, payload, options);

    return res.data;
  } catch (error) {
    return error;
  }
};
export const PatchData = async (url, payload) => {
  try {
    let res = await instance.patch(url, payload);

    return res.data;
  } catch (error) {
    return error;
  }
};
export const DeleteData = async (url, options = {}) => {
  try {
    let res = await instance.delete(url, options);
    return res.data;
  } catch (error) {
    return error;
  }
};

export default instance;
