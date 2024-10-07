const DEBUG = true;
export const baseURL = DEBUG ? "http://localhost:8000" : "https://production.com";
export const baseApiURL = DEBUG ? "http://localhost:8000/api" : `${baseURL}/api`;
