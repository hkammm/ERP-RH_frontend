import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });

      const userData: User = {
        _id: res.data._id,
        email: res.data.email,
        role: res.data.role,
        token: res.data.token,
      };

      setCurrentUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));

      return userData;
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value: AuthContextType = {
    currentUser,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
