import axios from 'axios';

const api = axios.create({
    /* ip used to test api projects on my physical android */
    baseURL: 'http://192.168.0.103:3333',
});

export default api;