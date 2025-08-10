import axios from 'axios';

export const createApiInstance = (basePath) => axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${basePath}`,
    timeout: 20000,
    withCredentials: true,
    headers: {
        "Accept": "application/json",
    },
});