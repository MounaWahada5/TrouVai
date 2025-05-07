export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function getFavorites() {
  const data = localStorage.getItem("favorites");
  return data ? JSON.parse(data) : [];
}
