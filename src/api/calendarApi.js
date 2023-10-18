import axios from 'axios';

//establesco el endpoint para no tener que poner en cada peticion http://...
const calendarApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

//interceptor, intercepta mis peticiones y le agrega la configuracion

calendarApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers, //puedem haber congi personalizadas por lo que expandimos todo lo que haya en config
        'x-token': localStorage.getItem('token')
    }
    return config;
})

export default calendarApi;