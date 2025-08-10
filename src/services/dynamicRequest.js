import Cookies from 'js-cookie';
// import toastHandler from '@/functions/toastHandler';
import { redirect } from 'next/navigation';


export const dynamicRequest = async ({ method, endpoint, data, headers = {}, axios, params }) => {
    try {
        const TOKEN = Cookies.get('TOKEN');
        const LOCALE = Cookies.get('NEXT_LOCALE');
        const browserID = localStorage.getItem('BROWSER_ID');
        const browserName = navigator.userAgent;

        if (TOKEN) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;
        }

        const deviceInfo = {
            browserID: browserID || 'unknown',
            browser: typeof window !== 'undefined' ? browserName : 'unknown',
        };

        const config = {
            url: endpoint,
            method,
            headers: {
                ...headers,
                'X-Device-Identity': JSON.stringify(deviceInfo),
                'Accept-Language': LOCALE,
            },
            params,
            data
        };

        const res = await axios(config);

        if (res.data.message) toastHandler('success', res.data.message);

        return res;
    } catch (error) {
        handleRequestError(error);
    }
};

const handleRequestError = (error) => {
    const { response } = error;
    const LOCALE = Cookies.get('NEXT_LOCALE');
    
    if (!response) {
        throw error;
    }

    switch (response.status) {
        case 500:
            // toastHandler('err', 'خطایی در ارتباط با سرور.');
            break;
        case 422:
            // toastHandler('err', 'اطلاعات ارسالی صحیح نیست.');
            break;
        case 401:
            Cookies.remove('TOKEN', { domain: `.${process.env.NEXT_PUBLIC_REPORT_FRONT_DOMAIN}`, path: '/' });
            redirect(`/${LOCALE}/auth`);
        case 400:
            if (response.data.message) {
                // toastHandler('err', response.data.message);
            }
            break;
        default:
            break;
    }

    throw error;
};