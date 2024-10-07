/* eslint-disable prettier/prettier */
import axios from "axios";

import { baseApiURL } from "./config";

const API = axios.create({ baseURL: baseApiURL });

API.interceptors.request.use(async (req) => {
  try {
    const response = await fetch(`${baseApiURL}/rest/rest-check/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // console.log('Server Available');
    } else {
      // console.log('Server not Available');
      window.location.href = "/server-error";
    }
  } catch (err) {
    // console.error('Error checking server:', err);
    window.location.href = "/server-error";
  }

  // setting auth token 
  // if (getDataFromStorage("accountAuthToken")) {
  //   // console.log(getDataFromStorage('authToken'));
  //   req.headers.authorization = `Bearer ${getDataFromStorage("authToken")}`;
  // }
  return req;
});

export default API;
