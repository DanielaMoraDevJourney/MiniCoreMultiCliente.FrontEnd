// src/api/axiosConfig.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error("Error en la respuesta de Axios:", error);
        if (error.response) {
            alert(`Error del servidor: ${error.response.status} - ${error.response.data}`);
        } else if (error.request) {
            alert("No se recibió respuesta del servidor.");
        } else {
            alert("Error desconocido al hacer la solicitud.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
