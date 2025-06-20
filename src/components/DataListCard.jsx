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
      const res = await fetch(`http://localhost:8000/api/blockchain/download/${dataId}`, {
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Download failed');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${dataId}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert('Download error');
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
