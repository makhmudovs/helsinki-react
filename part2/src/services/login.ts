import axios from 'axios';
const baseUrl = '/api/login';

interface Creds {
    username:string;
    password:string;
}

const login = async (credentials:Creds) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
}

export default {
    login
}