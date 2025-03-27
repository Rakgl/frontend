import axios from 'axios';

const api = axios.create({
    baseURL: 'http://api-react.test',
    withCredentials: true,
});

export default api;
