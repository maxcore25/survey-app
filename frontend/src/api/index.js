import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://62.109.29.32:8080/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`
  }
});