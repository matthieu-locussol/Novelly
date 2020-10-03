import axios from 'axios';

const novellyApi = axios.create({
   baseURL: '/api',
   headers: {
      Accept: 'application/json',
   },
});

export default novellyApi;
