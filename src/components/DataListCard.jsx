import React, { useEffect, useState, useContext } from 'react';
import './DataListCard.css';
import {EncryptionContext} from '../context/EncryptionContext'

function DataListCard() {
  const [dataIds, setDataIds] = useState([]);
  const [activeField, setActiveField] = useState({ id: null, type: null });
  const [addressInput, setAddressInput] = useState('');
  const { refreshList } = useContext(EncryptionContext);

  useEffect(() => {
    const fetchDataIds = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/blockchain/data', {
          credentials: 'include',
        });
        const result = await response.json();
        setDataIds(result.data_ids || []);
      } catch (error) {
        console.error('Failed to fetch data IDs:', error);
      }
    };

    fetchDataIds();
  }, [refreshList]);

  const handleAccessClick = (id, type) => {
    setActiveField({ id, type });
    setAddressInput('');
  };

  const handleAccessSubmit = async () => {
    const { id, type } = activeField;
    if (!addressInput) return;

    const url = type === 'grant'
      ? 'http://localhost:8000/api/blockchain/access/grant'
      : 'http://localhost:8000/api/blockchain/access/revoke';

    try {
      const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data_id: id, address: addressInput }),
      });

      if (res.ok) {
        alert(`Access ${type === 'grant' ? 'granted' : 'revoked'} successfully.`);
        setActiveField({ id: null, type: null });
        setAddressInput('');
      } else {
        const err = await res.json();
        alert(err.detail || 'Failed to perform action');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  const handleDownload = async (dataId) => {
    try {
      // Step 1: Retrieve encrypted metadata
      const retrieveRes = await fetch(`http://localhost:8000/api/blockchain/retrieve/${dataId}`, {
        credentials: 'include',
      });
      if (!retrieveRes.ok) throw new Error('Failed to retrieve encrypted metadata.');
      const encryptedData = await retrieveRes.json();
      const file_location = "/app/data_encrypted.bin";
      // Step 2: Ask user for their private key
      const privateKey = window.prompt("Enter your private key to download the data:");
      if (!privateKey) {
        alert("Download cancelled. Private key is required.");
        return;
      }
      // Step 3: Decrypt the data
      const decryptRes = await fetch("http://localhost:9000/decrypt_data", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          private_key: privateKey,
          kem_ciphertext: encryptedData.kem_cyphertext ?? "",
          aes_iv: encryptedData.aes_iv ?? "",
          aes_tag: encryptedData.aes_tag ?? "",
          encrypted_file: file_location,
        }),
      });

      if (!decryptRes.ok) throw new Error('Decryption failed');
      // 🔍 READ raw text and manually sanitize if needed
      const rawText = await decryptRes.text();

      let decryptedData;
      try {
        // 👇 This will work even if it's an array or object
        decryptedData = JSON.parse(rawText, (key, value) => {
          return value === null ? "" : value;
        });
      } catch (err) {
        console.error("❌ Failed to parse response", rawText, err);
        alert("Failed to parse JSON from decryption response.");
        return;
      }

      // ✅ Create a Blob from sanitized data and download
      const blob = new Blob([JSON.stringify(decryptedData, null, 2)], {
        type: 'application/json',
      });

      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${dataId}_decrypted.json`;
      a.click();
      window.URL.revokeObjectURL(downloadUrl);

      alert('Decrypted file downloaded successfully.');
      } 
      catch (err) {
        console.error(err);
        alert(err.message || 'Error during download');
      }

  };


  return (
    <div className="data-list-card">
      <h2>Stored Data IDs</h2>
      {dataIds.length === 0 ? (
        <p>No blockchain data found.</p>
      ) : (
        <ul>
          {dataIds.map((id) => (
            <li key={id} className="data-item">
              <span className="data-id">{id}</span>
              <div className="inline-actions">
                <button onClick={() => handleDownload(id)}>Download</button>
                <button onClick={() => handleAccessClick(id, 'grant')}>Grant</button>
                <button onClick={() => handleAccessClick(id, 'revoke')}>Revoke</button>

                {activeField.id === id && (
                  <>
                    <input
                      type="text"
                      placeholder="Address"
                      value={addressInput}
                      onChange={(e) => setAddressInput(e.target.value)}
                      className="address-input"
                    />
                    <button onClick={handleAccessSubmit} title="Submit">✓</button>
                    <button onClick={() => setActiveField({ id: null, type: null })} title="Cancel">✖</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DataListCard;
