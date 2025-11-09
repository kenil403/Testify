import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001';

export async function assignPaper(category, lastPaperId = null) {
  try {
    const { data } = await axios.post(`${API_BASE}/api/papers/assign`, { category, lastPaperId });
    return data?.paperId || null;
  } catch (e) {
    return null;
  }
}

export async function getPaper(category, paperId) {
  try {
    const { data } = await axios.get(`${API_BASE}/api/papers/${encodeURIComponent(category)}/${encodeURIComponent(paperId)}`);
    return data?.paper || null;
  } catch (e) {
    return null;
  }
}

export default { assignPaper, getPaper };
