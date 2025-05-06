export async function searchQuery(query) {
    const res = await fetch('http://localhost:5000/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    if (!response.ok) {
      throw new Error("Échec de la requête vers le backend");
    }
    return await response.json();
  }
  
  export async function getHistory() {
    const res = await fetch('http://localhost:5000/history')
    const data = await res.json()
    return data.history
  }
  export async function fetchSearchResults(query) {
    const res = await fetch(`http://localhost:5000/search?q=${query}`);
    const data = await res.json();
    return data.results;
  }
  