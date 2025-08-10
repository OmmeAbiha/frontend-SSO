import { dynamicRequest } from "../dynamicRequest";
import { sso } from '../APIFactory'

const checkPassword = async (data) => {
    const option = {
        axios: sso,
        method: 'POST',
        endpoint: '/registration/CheckPassword',
        data: data
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};

export default checkPassword; 