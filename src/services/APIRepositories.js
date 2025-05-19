import axios from 'axios';
import Cookies from 'js-cookie';

export const createApiInstance = () => axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    timeout: 20000,
    headers: {
        "Accept": "application/json",
    },
});

export const attachToken = (instance) => {
    const token = Cookies.get('TOKEN');
    const locale = Cookies.get('NEXT_LOCALE');

    if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    if (locale) {
        instance.defaults.headers.common['Accept-Language'] = locale;
    }

    return instance;
};
