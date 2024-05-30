// src/components/General.js
import React, { useState } from 'react';

const General = () => {
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleIdNumberChange = (e) => {
    setIdNumber(e.target.value);
  };

  return (
    <div>
      <h3>General Settings</h3>
      <form>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" className="form-control" value={name} onChange={handleNameChange} />
        </div>
        <div className="form-group">
          <label>ID Number:</label>
          <input type="text" className="form-control" value={idNumber} onChange={handleIdNumberChange} />
        </div>
      </form>
    </div>
  );
};

export default General;