import axios from 'axios';

const api = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
   headers: {
      Accept: 'application/json',
   },
});

export default api;
