import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:5225/api',  // Use HTTP no lugar de HTTPS
});

export default api;
