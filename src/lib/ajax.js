import axios from 'axios';
// Add a request interceptor
axios.interceptors.request.use(function(config) {
  // Do something before request is sent
  // config.url = `https://www.easy-mock.com/mock/5a3a01780bd9de68557eecd8${config.url}`
  return config;
}, function(error) {
  // Do something with request error
  return Promise.reject(error);
});
export default axios;
