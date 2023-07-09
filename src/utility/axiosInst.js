import axios from "axios";
import env from "../env";

const axiosInst = axios.create({
    baseURL: env.api.MAIN_API_URL,
    timeout: 2500,
    withCredentials: true
})

export default axiosInst