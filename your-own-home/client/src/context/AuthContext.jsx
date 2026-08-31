import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import api from '../services/api.js';

const AuthContext = createContext(null);

/**
 * Holds the authenticated user. Auth state is derived from the httpOnly
 * cookie via GET /api/auth/me — we never read or store the JWT itself
 * on the client, so there is nothing here for XSS to steal.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const { data } = await api.get('/auth/me');
      setUser(data.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const login = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    setUser(data.data.user);
    return data.data.user;
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    setUser(data.data.user);
    return data.data.user;
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, refetchUser: fetchCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
