import { dynamicRequest } from "../dynamicRequest";
import { sso } from '../APIFactory'

const passwordChangeVerifyOTP = async (data) => {
    const option = {
        axios: sso,
        method: 'POST',
        endpoint: '/passwordChange/verifyOTP',
        data: data
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};

export default passwordChangeVerifyOTP; 