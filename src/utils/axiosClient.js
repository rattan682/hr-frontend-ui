import axios from "axios";
import Cookies from "js-cookie";
import { BACKEND_API } from "../../constants";

const axiosClient = axios.create({
  baseURL: BACKEND_API,
  withCredentials: true,
});

export default axiosClient;
