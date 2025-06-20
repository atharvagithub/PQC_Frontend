import React, { useState, useEffect, useContext } from 'react';
import './StoreCard.css';
import { EncryptionContext } from '../context/EncryptionContext';

function StoreCard() {
  const { encryptionData  } = useContext(EncryptionContext); // 🔥 Step 4
  const { setRefreshList } = useContext(EncryptionContext);
  const [formData, setFormData] = useState({
    cid_hash: '',
    aes_iv: '',
    aes_tag: '',
    kem_cyphertext: ''
  });

  useEffect(() => {
    // Automatically fill form if encryptionData is available
    if (encryptionData ) {
      setFormData({
        cid_hash: encryptionData.CID || '',
        aes_iv: encryptionData.aes_iv || '',
        aes_tag: encryptionData.aes_tag || '',
        kem_cyphertext: encryptionData.kem_ciphertext || ''
      });
    }
  }, [encryptionData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/blockchain/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Data stored successfully!');
        setRefreshList(prev => !prev);
      } else {
        alert(data.detail || '⚠️ Error occurred.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Failed to store data.');
    }
  };

  return (
    <div className="store-card">
      <h2>Store to Blockchain</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cid_hash">CID Hash</label>
        <input
          type="text"
          name="cid_hash"
          value={formData.cid_hash}
          onChange={handleChange}
          required
        />

        <label htmlFor="aes_iv">AES IV</label>
        <input
          type="text"
          name="aes_iv"
          value={formData.aes_iv}
          onChange={handleChange}
          required
        />

        <label htmlFor="aes_tag">AES Tag</label>
        <input
          type="text"
          name="aes_tag"
          value={formData.aes_tag}
          onChange={handleChange}
          required
        />

        <label htmlFor="kem_cyphertext">KEM Ciphertext</label>
        <textarea
          name="kem_cyphertext"
          value={formData.kem_cyphertext}
          onChange={handleChange}
          rows={6}
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default StoreCard;
