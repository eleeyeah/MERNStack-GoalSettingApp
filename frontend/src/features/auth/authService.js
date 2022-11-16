// strictly for making the http request to the server, sending the data back and setting the token in the local storage

import axios from 'axios';

const API_URL = '/api/users/';

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData);

    if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

const authService = {
    register
}

export default authService;