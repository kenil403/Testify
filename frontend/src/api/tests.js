import axios from 'axios';
import { getToken } from './auth';

const API_BASE = 'http://localhost:3001';

export async function addTestResult(payload) {
  const url = `${API_BASE}/api/tests/add`;
  const token = getToken();
  const res = await axios.post(url, payload, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
}

export async function getTestHistory() {
  const url = `${API_BASE}/api/tests`;
  const token = getToken();
  const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
}

export default { addTestResult, getTestHistory };
