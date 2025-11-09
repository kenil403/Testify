import axios from 'axios';
import { getToken } from './auth';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001';

export async function listPdfs(section, subsection) {
  try {
    const token = getToken();
    const { data } = await axios.get(`${API_BASE}/api/pdfs`, {
      params: { section, subsection },
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    });
    return data?.items || [];
  } catch (e) {
    return [];
  }
}

export function buildViewUrl(id) {
  const base = (import.meta.env.VITE_API_BASE || 'http://localhost:3001').replace(/\/$/, '');
  const token = getToken();
  return token ? `${base}/api/pdfs/${id}/view?token=${encodeURIComponent(token)}` : `${base}/api/pdfs/${id}/view`;
}

export function buildDownloadUrl(id) {
  const base = (import.meta.env.VITE_API_BASE || 'http://localhost:3001').replace(/\/$/, '');
  const token = getToken();
  return token ? `${base}/api/pdfs/${id}/download?token=${encodeURIComponent(token)}` : `${base}/api/pdfs/${id}/download`;
}

export default { listPdfs, buildViewUrl, buildDownloadUrl };
