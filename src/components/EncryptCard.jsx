import React, { useState, useEffect, useContext } from 'react';
import './EncryptCard.css';
import { motion } from 'framer-motion';
import {EncryptionContext } from '../context/EncryptionContext'

const EncryptCard = () => {
  const [publicKey, setPublicKey] = useState('');
  const [fileContent, setFileContent] = useState(null);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState('');
  const [encryptionResponse, setEncryptionResponse] = useState(null);
  const { setEncryptionData } = useContext(EncryptionContext);

  useEffect(() => {
    const savedKey = localStorage.getItem('encrypt_publicKey');
    const savedData = localStorage.getItem('encrypt_fileContent');
    const savedResponse = localStorage.getItem('encrypt_response');

    if (savedKey) setPublicKey(savedKey);
    if (savedData) setFileContent(JSON.parse(savedData));
    if (savedResponse) setEncryptionResponse(JSON.parse(savedResponse));
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setFileContent([json]); // store as array of one object
        localStorage.setItem('encrypt_fileContent', JSON.stringify([json]));
      } catch (err) {
        setError('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  const handleEncrypt = async () => {
    setError('');
    setIsEncrypting(true);

    const payload = {
      public_key: publicKey,
      data: fileContent,
    };

    try {
      const response = await fetch('http://localhost:9000/encrypt_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Encryption failed');
      }

      const data = await response.json();
      setEncryptionResponse(data);
      localStorage.setItem('encrypt_response', JSON.stringify(data));
      setEncryptionData(data);

    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsEncrypting(false);
    }
  };

  return (
    <div className="encrypt-card">
      <h2>Encrypt Geospatial Data</h2>

      <label>Paste Public Key</label>
      <textarea
        className="encrypt-textarea"
        placeholder="Enter recipient's public key"
        value={publicKey}
        onChange={(e) => setPublicKey(e.target.value)}
      />

      <label>Upload JSON File</label>
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="encrypt-button"
        style={{ marginTop: '0.5rem' }}
      />

      <button
        className="encrypt-button"
        onClick={handleEncrypt}
        disabled={isEncrypting || !publicKey || !fileContent}
      >
        {isEncrypting ? 'Encrypting...' : 'Encrypt'}
      </button>

      {isEncrypting && (
        <motion.div
          className="encryption-animation"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
        >
          🔐 Encrypting...
        </motion.div>
      )}
      {encryptionResponse && (
        <div className="encrypt-result">
          <strong>Encryption Result:</strong>
          <div className="encrypt-output-box"><strong>CID:</strong> {encryptionResponse.CID}</div>
          <div className="encrypt-output-box"><strong>AES IV:</strong> {encryptionResponse.aes_iv}</div>
          <div className="encrypt-output-box"><strong>AES Tag:</strong> {encryptionResponse.aes_tag}</div>
          <div className="encrypt-output-box">
            <strong>KEM Ciphertext:</strong>
            <div className='scrollable-output'>
              {encryptionResponse.kem_ciphertext}
            </div>
          </div>
        </div>
      )}

      {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
    </div>
  );
};

export default EncryptCard;
