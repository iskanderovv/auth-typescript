import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.51.206.62:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default instance;
