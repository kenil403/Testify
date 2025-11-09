import axios from 'axios';
import { getToken } from './auth';

const API_BASE = 'http://localhost:3001';

export async function addTestResult(payload) {
  const url = `${API_BASE}/api/tests/add`;
  const token = getToken();
  try {
    // payload can include { category, score, paperId }
    const res = await axios.post(url, payload, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
  } catch (err) {
    // If DB is unavailable or times out, surface a safe response so caller can proceed
    const status = err?.response?.status;
    if (status === 503) {
      return { message: 'Database unavailable', testHistory: [] };
    }
    throw err;
  }
}

export async function getTestHistory() {
  const url = `${API_BASE}/api/tests`;
  const token = getToken();
  try {
    const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
  } catch (err) {
    const status = err?.response?.status;
    if (status === 503) {
      return { testHistory: [] };
    }
    throw err;
  }
}

export default { addTestResult, getTestHistory };
