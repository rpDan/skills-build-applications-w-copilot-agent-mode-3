const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export function getItems(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

export async function fetchCollection(resource) {
  const response = await fetch(`${API_BASE_URL}/api/${resource}/`);
  if (!response.ok) {
    throw new Error(`Unable to load ${resource} (${response.status})`);
  }

  return getItems(await response.json());
}