import axios from "axios";

export const axiosClient = axios.create({
  baseURL: `http://localhost:3000`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'access-control-allow-origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With'
  }
});

// export default axiosClientt;
