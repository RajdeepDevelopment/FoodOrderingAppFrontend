import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const TestCom = () => {
  const [inputText, setInputText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const encryptionKey = 'YourEncryptionKey'; // Replace with your own encryption key

  const handleEncrypt = () => {
    const encrypted = CryptoJS.AES.encrypt(inputText, encryptionKey).toString();
    setEncryptedText(encrypted);
  };

  const handleDecrypt = () => {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, encryptionKey).toString(CryptoJS.enc.Utf8);
    setDecryptedText(decrypted);
  };

  return (
    <div>
      <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
      <button onClick={handleEncrypt}>Encrypt</button>
      <div>
        <strong>Encrypted Text:</strong>
        <p>{encryptedText}</p>
      </div>
      <button onClick={handleDecrypt}>Decrypt</button>
      <div>
        <strong>Decrypted Text:</strong>
        <p>{decryptedText}</p>
      </div>
    </div>
  );
};

export default TestCom;

