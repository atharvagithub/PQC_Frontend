import React, { createContext, useState } from 'react';

export const EncryptionContext = createContext();

export const EncryptionProvider = ({ children }) => {
  const [encryptionData, setEncryptionData] = useState(null);
  const [refreshList, setRefreshList] = useState(false);

  return (
    <EncryptionContext.Provider value={{ encryptionData, setEncryptionData, refreshList, setRefreshList }}>
      {children}
    </EncryptionContext.Provider>
  );
};
