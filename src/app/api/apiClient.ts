// src/app/api.ts

import axios from 'axios';
import config from '../config';

console.log(config.BACKEND_URL)

export const apiClient = axios.create({
    baseURL: config.BACKEND_URL
});
