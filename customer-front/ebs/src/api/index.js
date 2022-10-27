import axios from "axios";
const axiosClient = axios.create({
  baseURL: "https://www.ssafy-ebs.com",
});

axiosClient.withCredentials = true;

export default axiosClient;