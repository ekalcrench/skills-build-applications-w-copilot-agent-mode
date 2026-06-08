export const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export const getApiUrl = (endpoint: string) => `${apiHost}/api/${endpoint}/`;

export type PaginatedResponse<T> = {
  data: T[];
  page?: number;
  total?: number;
  perPage?: number;
};

export const normalizeApiResponse = <T>(payload: any): T[] => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
};

export const fetchApi = async <T>(endpoint: string): Promise<T[]> => {
  const response = await fetch(getApiUrl(endpoint));
  if (!response.ok) {
    throw new Error(`Failed to fetch /api/${endpoint}`);
  }
  const payload = await response.json();
  return normalizeApiResponse<T>(payload);
};
