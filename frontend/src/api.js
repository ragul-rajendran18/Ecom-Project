import axios from 'axios';

const API = axios.create({ baseURL: 'https://ecom-project-r7ob.vercel.app/api' });

export const fetchProducts = () => API.get('/products').then(r => r.data);
export const checkout = (items) => API.post('/cart/checkout', { items }).then(r => r.data);

export default API;
