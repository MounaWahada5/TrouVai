const HISTORY_KEY = 'search_history';
const FAVORITES_KEY = 'favorites_list';

export function saveToHistory(query) {
  const current = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  const updated = [query, ...current.filter(q => q !== query)].slice(0, 10); // 10 derniers
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function getHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
}

export function saveToFavorites(result) {
  const current = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
  const updated = [result, ...current];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
}
