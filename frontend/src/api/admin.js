import axios from 'axios';
import { getToken } from './auth';

const API_BASE = import.meta?.env?.VITE_API_BASE || 'http://localhost:3001';

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function listUsers(params = {}) {
  // Use public, read-only endpoint for listing users to enable realtime dashboard without auth
  const res = await axios.get(`${API_BASE}/api/public/users`, {
    params: { ...params, _ts: Date.now() } // cache-busting to avoid stale responses (no custom headers to avoid CORS preflight)
  });
  return res.data; // { users, total }
}

export async function getUser(id) {
  // Use public, read-only endpoint for fetching a user without auth
  const res = await axios.get(`${API_BASE}/api/public/users/${id}`, {
    params: { _ts: Date.now() }
  });
  return res.data; // user
}

export async function updateUser(id, payload) {
  // Use public endpoint (no auth) for now
  const res = await axios.put(`${API_BASE}/api/public/users/${id}`, payload);
  return res.data; // updated user
}

export async function deleteUser(id) {
  // Use public endpoint (no auth) for now
  const res = await axios.delete(`${API_BASE}/api/public/users/${id}`);
  return res.data; // { success: true }
}

export async function createUser(payload) {
  // Use public endpoint (no auth) for now
  const res = await axios.post(`${API_BASE}/api/public/users`, payload);
  return res.data; // created user
}

// Test history (scores) CRUD for a particular user (no auth for now)
export async function addUserTest(userId, test) {
  const res = await axios.post(`${API_BASE}/api/public/users/${userId}/tests`, test);
  return res.data; // updated user
}

export async function updateUserTest(userId, index, test) {
  const res = await axios.put(`${API_BASE}/api/public/users/${userId}/tests/${index}`, test);
  return res.data; // updated user
}

export async function deleteUserTest(userId, index) {
  const res = await axios.delete(`${API_BASE}/api/public/users/${userId}/tests/${index}`);
  return res.data; // { success: true }
}

export async function clearUserTests(userId) {
  const res = await axios.delete(`${API_BASE}/api/public/users/${userId}/tests`);
  return res.data; // { success: true }
}

export default { listUsers, getUser, updateUser, deleteUser, createUser, addUserTest, updateUserTest, deleteUserTest, clearUserTests };
