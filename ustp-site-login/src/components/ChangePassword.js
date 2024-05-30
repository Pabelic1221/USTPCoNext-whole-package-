// src/components/ChangePassword.js
import React, { useState } from 'react';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  return (
    <div>
      <h3>Change Password</h3>
      <form>
        <div className="form-group">
          <label>Current Password:</label>
          <input type="password" className="form-control" value={currentPassword} onChange={handleCurrentPasswordChange} />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input type="password" className="form-control" value={newPassword} onChange={handleNewPasswordChange} />
        </div>
        <div className="form-group">
          <label>Confirm New Password:</label>
          <input type="password" className="form-control" value={confirmNewPassword} onChange={handleConfirmNewPasswordChange} />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
