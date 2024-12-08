import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // Assurez-vous que c'est l'URL de votre backend
});

// Configuration pour inclure le token d'authentification dans les requêtes (si disponible)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
