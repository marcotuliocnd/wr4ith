const axios = require('axios');

const instance = axios.default.create({
    baseURL: process.env.API_URL,
    headers: {
        authorization: `Bearer ${process.env.API_TOKEN}`
    },
});

const saveClip = (payload = {}) => {
    return instance.post('/clips', payload);
}

module.exports = {
    saveClip,
}