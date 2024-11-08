// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333', // URL da API do AdonisJS
});

export default api;
