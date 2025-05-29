import React, { useState } from 'react';
import './KeyGenerationCard.css';

const KeyGenerationCard = () => {
  const [keys, setKeys] = useState({ publicKey: '', privateKey: '', note: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showKeys, setShowKeys] = useState(false);

  const handleGenerateKeys = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:9000/generate_keys');
      const data = await response.json();
      console.log('API Data:', data);
      setKeys({
        publicKey: data.public_key,
        privateKey: data.private_key,
        note: data.note,
      });
      setShowKeys(true);
    } catch (err) {
      console.error(err);
      setError('Failed to generate keys.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="key-card">
      <h2>Generate Cryptographic Keys</h2>
      <p>Click the button below to securely generate a public-private key pair.</p>
      <button className="key-button" onClick={handleGenerateKeys} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Keys'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Always render this block to debug */}
      {showKeys && (
      <div className="key-output">
        <div className="key-block">
          <h4>Public Key:</h4>
          <div className="key-content">{keys.publicKey || 'No key generated yet'}</div>
        </div>
        <div className="key-block">
          <h4>Private Key:</h4>
          <div className="key-content">{keys.privateKey || 'No key generated yet'}</div>
        </div>
        <div>
          <h4>Note:</h4>
          <div className="key-content">{keys.note || 'No key generated yet'}</div>
        </div>
      </div>
      )}
    </div>
  );
};

export default KeyGenerationCard;
