import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(token);
    }
    setIsLoading(false); // 로딩 완료
  }, []);

  const login = async (token) => {
    console.log('Token before saving to localStorage:', localStorage.getItem('token')); // 저장 전 토큰 값 확인
    localStorage.setItem('token', token);
    console.log('Token saved to localStorage:', token); // 저장한 토큰 값 로그
    setUser(token);
    setIsLoading(false); // 로그인 후 로딩 완료
  };

  const logout = () => {
    localStorage.removeItem('token');
   setUser(null);
  };

  const value = { user, login, logout, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
