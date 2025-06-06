import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/blockchain/check_session', {
          method: 'POST',
          credentials: 'include' // Send cookie
        });
        const data = await res.json();
        setIsAuth(data.valid); // { valid: true } expected from backend
      } catch {
        setIsAuth(false);
      }
    };

    checkSession();
  }, []);

  if (isAuth === null) return null; // or loading indicator
  return isAuth ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
