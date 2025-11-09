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
  try {
    if (token) sessionStorage.setItem('auth_token', token);
    else sessionStorage.removeItem('auth_token');
  } catch {}
}

export function getToken() {
  try { return sessionStorage.getItem('auth_token'); } catch { return null; }
}

// Persist the authenticated user to survive refreshes
export function setStoredUser(user) {
  try {
    if (user) sessionStorage.setItem('auth_user', JSON.stringify(user));
    else sessionStorage.removeItem('auth_user');
  } catch {}
}

export function getStoredUser() {
  try {
    const raw = sessionStorage.getItem('auth_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearAuth() {
  try {
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_user');
  } catch {}
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

export async function me() {
  const url = `${API_BASE}/api/auth/me`;
  const token = getToken();
  if (!token) throw new Error('No authentication token found');
  const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
}

export default { register, login, setToken, getToken, updateProfile, setStoredUser, getStoredUser, clearAuth, me };
