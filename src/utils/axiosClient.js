import axios from "axios";
import Cookies from "js-cookie";
import { BACKEND_API } from "../../constants";

// Create an axios instance with default settings
const axiosClient = axios.create({
  baseURL: BACKEND_API, // Replace with your API base URL
  withCredentials: true, // Include cookies and credentials
});

// Add a request interceptor to include the hr-token in the headers
// axiosClient.interceptors.request.use((config) => {
//   console.log(document.cookie, "doc-cookies");
//   const hrToken = Cookies.get("hrtoken"); // Retrieve the hr-token cookie as JSON
//   console.log({ hrToken });
//   if (hrToken) {
//   }
//   config.headers[
//     "Cookie"
//   ] = `hrtoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NWIwOTZjZTA4MjBhYTM0OGY5NTVmYyIsImlhdCI6MTczNDY5MTgxMywiZXhwIjoxNzM0Njk5MDEzfQ.XC5boOVPk1Ie-Ph3-JIXhB0m8fYOegVBLDdNk02aFc4`; // Attach the cookie to headers
//   return config;
// });

export default axiosClient;
