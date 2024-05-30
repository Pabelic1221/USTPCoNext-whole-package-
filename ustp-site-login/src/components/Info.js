// src/components/Info.js
import React, { useState } from 'react';

const Info = () => {
  const [birthday, setBirthday] = useState('');
  const [country, setCountry] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleContactNumberChange = (e) => {
    setContactNumber(e.target.value);
  };

  return (
    <div>
      <h3>Info</h3>
      <form>
        <div className="form-group">
          <label>Birthday:</label>
          <input type="date" className="form-control" value={birthday} onChange={handleBirthdayChange} />
        </div>
        <div className="form-group">
          <label>Country:</label>
          <input type="text" className="form-control" value={country} onChange={handleCountryChange} />
        </div>
        <div className="form-group">
          <label>Contact Number:</label>
          <input type="text" className="form-control" value={contactNumber} onChange={handleContactNumberChange} />
        </div>
      </form>
    </div>
  );
};

export default Info;
