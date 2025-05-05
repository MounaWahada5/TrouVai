export async function searchQuery(query) {
    const res = await fetch('http://localhost:5000/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })
    return await res.json()
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
  