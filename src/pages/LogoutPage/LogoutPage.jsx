import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await fetch('http://127.0.0.1:8000/api/blockchain/logout', {
          method: 'POST',
          credentials: 'include', // Important to clear the cookie
        });
      } catch (err) {
        console.error('Logout failed', err);
      } finally {
        navigate('/login'); // Redirect to home or login page
      }
    };

    logout();
  }, [navigate]);

  return <p style={{ color: 'white', textAlign: 'center', marginTop: '3rem' }}>Logging out...</p>;
};

export default LogoutPage;
