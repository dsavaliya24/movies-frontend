import axios from "axios";


import { BASE_URL ,API_TOKEN} from "../config";

export const getToken = (key = "access_token") =>
  sessionStorage.getItem(key) ||
  localStorage.getItem(key) ||
  undefined;

function makeHeaders() {
  let headerObj = {};
  // if (getToken("access_token")) {
    // const token = `x-auth-token ${API_TOKEN}`;
    headerObj = {
     'x-auth-token': getToken(),
      "ngrok-skip-browser-warning": "true",
    };
  // }
  return headerObj;
}

const axiosApi = axios.create({
  baseURL: `${BASE_URL}/`,
});

axiosApi.interceptors.request.use((request) => {
  if (!request.ignoreAuth) {
    request.headers = makeHeaders();
  }
  return request;
});

axiosApi.interceptors.response.use(
  (response) => response,
  (err) => {
    const errorCode =
      err?.response && err?.response?.data && err?.response?.data.code;
    const errorMessage =
      err?.response &&
      err?.response?.data &&
      err?.response?.data?.message &&
      err?.response?.data?.message?.email;
    if (errorCode === 404 && errorMessage === "Account does not exist") {
      window.location = "/?unAuthorisedUser=true";
    }  else if (err?.response && err?.response?.status === 401) {
      localStorage.clear();
      sessionStorage.clear();
      window.location = "/login";
      return true;
    } 
    if (err?.response && err?.response?.status === 403) {
      // showNotification(err?.response?.data?.msg, 'error', 5000);
    }
    if (err?.response && err?.response?.status === 500) {
      // showNotification('Unknown server error', 'error', 5000);
    }
    return Promise.reject(err);
  }
);

export default axiosApi;
