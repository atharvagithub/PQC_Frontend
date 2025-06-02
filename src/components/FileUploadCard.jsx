import React, { useState } from 'react';
import './FileUploadCard.css';

const FileUploadCard = () => {
  const [fileContent, setFileContent] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setFileContent(JSON.stringify(json, null, 2));
        } catch (err) {
          setFileContent('Invalid JSON format');
        }
      };
      reader.readAsText(file);
    } else {
      setFileContent('Please upload a valid .json file.');
    }
  };

  return (
    <div className="upload-card">
      <h2>Upload Geospatial JSON File</h2>
      <p>Select a `.json` file to view its contents securely.</p>
      <input type="file" accept=".json" onChange={handleFileUpload} className="upload-input" />
      {fileName && <p className="file-name">📁 {fileName}</p>}
      {fileContent && (
        <div className="file-content">
          <pre>{fileContent}</pre>
        </div>
      )}
    </div>
  );
};

export default FileUploadCard;
