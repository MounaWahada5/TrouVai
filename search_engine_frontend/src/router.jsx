import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import HistoryPage from './pages/HistoryPage';
import FavoritesPage from './pages/FavoritesPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'history', element: <HistoryPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
]);

export default router;
