import React from 'react';
import './MainPage.css';
import KeyGenerationCard from '../../components/KeyGenerationCard';
import FileUploadCard from '../../components/FileUploadCard';
import EncryptCard from '../../components/EncryptCard';


const MainPage = () => {
  return (
    <div className="main-page">
      <div className='card-row'>
        <KeyGenerationCard />
        <FileUploadCard />
        <EncryptCard />
      </div>
    </div>
  );
};

export default MainPage;
