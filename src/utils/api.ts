const API_BASE_URL = import.meta.env.PROD 
  ? '' 
  : 'http://localhost:3001';

export async function searchProducts(keyword: string) {
  const response = await fetch(`${API_BASE_URL}/api/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ keyword }),
  });
  
  if (!response.ok) {
    throw new Error('Search failed');
  }
  
  return response.json();
}
