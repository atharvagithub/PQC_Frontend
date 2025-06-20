import React from 'react';
import './BlockPage.css';
import StoreCard from '../../components/StoreCard';
import DataListCard from '../../components/DataListCard';

const BlockPage = () => {
  return (
    <div className="blockchain-page">
      <h1>Blockchain Operations</h1>

      <div className="horizontal-container">
        <StoreCard />
        <DataListCard />
      </div>
    </div>
  );
}

export default BlockPage;
