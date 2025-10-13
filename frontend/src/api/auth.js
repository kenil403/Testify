import axios from 'axios';

const API_BASE = 'http://localhost:3001';

export async function register(payload) {
  const url = `${API_BASE}/api/auth/register`;
  const res = await axios.post(url, payload);
  console.log(res.data);
  
  return res.data;
}

export async function login(payload) {
  const url = `${API_BASE}/api/auth/login`;
  const res = await axios.post(url, payload);
  return res.data;
}

export function setToken(token) {
  if (token) localStorage.setItem('auth_token', token);
  else localStorage.removeItem('auth_token');
}

export function getToken() {
  return localStorage.getItem('auth_token');
}

export async function updateProfile(payload) {
  const url = `${API_BASE}/api/auth/update-profile`;
  const token = getToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  const res = await axios.put(url, payload, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return res.data;
}

export default { register, login, setToken, getToken, updateProfile };
