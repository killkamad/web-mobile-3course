import axios from 'axios';

export default axios.create({
    baseURL: 'https://developers.zomato.com/api/v2.1',
    headers: {
        'user-key': 'e473f19d0adc59a157858f00406f503d'
    }
});
