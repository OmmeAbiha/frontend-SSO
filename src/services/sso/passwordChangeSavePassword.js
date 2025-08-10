import { dynamicRequest } from "../dynamicRequest";
import { sso } from '../APIFactory'

const passwordChangeSavePassword = async (data) => {
    const option = {
        axios: sso,
        method: 'POST',
        endpoint: '/passwordChange/SavePassword',
        data: data
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};

export default passwordChangeSavePassword;