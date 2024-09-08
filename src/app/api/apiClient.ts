// src/app/api.ts

import axios from 'axios';
import config from '../config';

export const apiClient = axios.create({
    baseURL: config.BACKEND_URL
});

export const cardTraderApiClient = axios.create({
    baseURL: 'https://api.cardtrader.com/api/v2',
    headers: {
        Authorization: `Bearer ${config.CARD_TRADER_TOKEN}`
    }
});