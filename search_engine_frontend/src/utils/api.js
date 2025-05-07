export async function searchQuery(query) {
  const response = await fetch('http://localhost:5000/api/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error("Échec de la requête vers le backend");
  }

  return await response.json();
}

export async function getHistory(token) {
  const response = await fetch('http://localhost:5000/api/history', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data.history;
}
