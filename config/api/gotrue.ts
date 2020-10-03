import GoTrue from 'gotrue-js';

const gotrueApi = new GoTrue({
   APIUrl: process.env.GOTRUE_API_ENDPOINT,
   audience: '',
   setCookie: true,
});

export default gotrueApi;
