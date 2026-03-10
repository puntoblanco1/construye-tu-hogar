import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const API = process.env.REACT_APP_BACKEND_URL;

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const checkAuth = useCallback(async () => {
    // CRITICAL: If returning from OAuth callback, skip the /me check.
    // AuthCallback will exchange the session_id and establish the session first.
    if (window.location.hash?.includes('session_id=')) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API}/api/auth/me`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        await loadFavorites();
      }
    } catch {
      // Not logged in
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const loadFavorites = async () => {
    try {
      const res = await fetch(`${API}/api/favorites`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setFavorites(data);
      }
    } catch {
      // ignore
    }
  };

  const login = async (email, password) => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Login failed');
    }
    const data = await res.json();
    setUser(data);
    await loadFavorites();
    return data;
  };

  const register = async (name, email, password) => {
    const res = await fetch(`${API}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Registration failed');
    }
    const data = await res.json();
    setUser(data);
    return data;
  };

  const googleLogin = async (sessionId) => {
    const res = await fetch(`${API}/api/auth/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ session_id: sessionId }),
    });
    if (!res.ok) {
      throw new Error('Google login failed');
    }
    const data = await res.json();
    setUser(data);
    await loadFavorites();
    return data;
  };

  const logout = async () => {
    await fetch(`${API}/api/auth/logout`, { method: 'POST', credentials: 'include' });
    setUser(null);
    setFavorites([]);
  };

  const toggleFavorite = async (propertyId) => {
    if (!user) return false;
    const isFav = favorites.includes(propertyId);
    try {
      if (isFav) {
        await fetch(`${API}/api/favorites/${propertyId}`, { method: 'DELETE', credentials: 'include' });
        setFavorites(prev => prev.filter(id => id !== propertyId));
      } else {
        await fetch(`${API}/api/favorites/${propertyId}`, { method: 'POST', credentials: 'include' });
        setFavorites(prev => [...prev, propertyId]);
      }
      return true;
    } catch {
      return false;
    }
  };

  const isFavorite = (propertyId) => favorites.includes(propertyId);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout, favorites, toggleFavorite, isFavorite, loadFavorites }}>
      {children}
    </AuthContext.Provider>
  );
};
