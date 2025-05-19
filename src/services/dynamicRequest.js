//functions
import Cookies from 'js-cookie';
import toastHandler from '@/functions/toastHandler';

export const dynamicRequest = async (options) => {
    const { method, endpoint, data, headers, axios } = options;

    try {
        const config = {
            url: endpoint,
            method: method,
            headers: headers,
            ...(method === "GET" ? { params: data } : { data: data })
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
    if (!response) {
        throw error;
    }

    switch (response.status) {
        case 500:
            toastHandler('err', 'خطایی در ارتباط با سرور.');
            break;
        case 422:
            toastHandler('err', 'اطلاعات ارسالی صحیح نیست.');
            break;
        case 401:
            Cookies.remove('TOKEN', { domain: `.${process.env.NEXT_PUBLIC_REPORT_FRONT_DOMAIN}`, path: '/' });
            break;
        case 400:
            if (response.data.message) {
                toastHandler('err', response.data.message);
            }
            break;
        default:
            return null;
    }

    throw error;
};
