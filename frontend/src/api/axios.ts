import axios from 'axios';

export const axiosClient = axios.create({
  // base url can be extracted to an environment variable for better flexibility
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
