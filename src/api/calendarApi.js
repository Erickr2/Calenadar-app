import axios from 'axios';

//establesco el endpoint para no tener que poner en cada peticion http://...
const calendarApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})


export default calendarApi;