import axios from 'axios';

const api = axios.create({
   baseURL: 'https://fcbdkzwh87.execute-api.eu-west-3.amazonaws.com/api/staging',
   headers: {
      Accept: '*/*',
   },
});

export default api;
