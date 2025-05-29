import React from 'react';
import '../../components/Navbar.jsx';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="landing"
    
    >
      <div className="hero">
        <h1>PQC GEOSPATIAL</h1>
        <h2>Secure Blockchain Data</h2>
        <p>Demonstrating secure geospatial data handling using Post-Quantum Cryptography and Blockchain.</p>
        <button onClick={() => navigate('/main')}>Enter App</button>
      </div>
    </div>
  );
};

export default HomePage;
