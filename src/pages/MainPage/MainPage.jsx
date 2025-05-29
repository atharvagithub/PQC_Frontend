import React from 'react';
import './MainPage.css';
import KeyGenerationCard from '../../components/KeyGenerationCard';


const MainPage = () => {
  return (
    <div className="main-page">
      <KeyGenerationCard />
      <h1>Main Application Page</h1>
      <p>Display maps, blockchain interaction, and encrypted data visualization here.</p>
    </div>
  );
};

export default MainPage;
