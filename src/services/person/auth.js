import { dynamicRequest } from "../dynamicRequest";
import { person } from '../APIRepositories'

const auth = async (data) => {
    const option = {
        axios: person,
        method: 'POST',
        endpoint: '/auth',
        data: data
    }

    const response = await dynamicRequest(option)
    try {
        return response
    } catch (error) {
        throw error
    }
};

export default auth;