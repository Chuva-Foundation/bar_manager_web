import axios from 'axios';
const token = localStorage.getItem('token')
console.log(token)
export default axios.create({
    baseURL: 'http://192.168.188.3:5000',
headers: { Authorization: `Bearer ${token}`}

});
