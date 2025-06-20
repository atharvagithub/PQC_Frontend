import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [privateKey, setPrivateKey] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/blockchain/login', { private_key: privateKey }, {
        withCredentials: true,
      });
      if (res.data.message === 'Login successful') {
        navigate('/');  // or your home route
      }
      else {
        setError('Unexpected login response'); }
    } catch (err) {
      setError('Invalid private key');
    }
  };

  return (
    <div className="login-container">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          USER LOGIN
        </motion.h2>

        <motion.div
          className="input-wrapper"
          whileFocus={{ scale: 1.05 }}
        >
          <span className="icon">👤</span>
          <motion.input
            type="text"
            placeholder="Account"
            whileFocus={{ scale: 1.02 }}
          />
        </motion.div>

        <motion.div
          className="input-wrapper"
          whileFocus={{ scale: 1.05 }}
        >
          <motion.input
            type="password"
            placeholder="Private Key"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />
          <span className="icon">🔒</span>
        </motion.div>

        <motion.button
          onClick={handleLogin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          LOGIN
        </motion.button>

        {error && <motion.p className="error-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.p>}
      </motion.div>
    </div>
  );
};

export default LoginPage;
