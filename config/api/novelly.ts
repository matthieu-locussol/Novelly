import axios from 'axios';

const novellyApi = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
   headers: {
      Accept: 'application/json',
   },
});

export default novellyApi;
