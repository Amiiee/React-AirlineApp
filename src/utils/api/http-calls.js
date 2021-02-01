import axios from "axios";

export const httpGet = (endpoint) => {
  return axios.get(endpoint);
};

export const httpPost = (endpoint, payload) => {
  return axios.post(endpoint, { ...payload });
};
export const httpPut = (endpoint, payload) => {
  return axios.put(endpoint, { ...payload });
};
export const httpDelete = (endpoint) => {
  return axios.delete(endpoint);
};
