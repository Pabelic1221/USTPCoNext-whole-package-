import React, { useContext } from 'react';
import { UserContext } from './UserContext';

const NewsCreation = () => {
  const { user } = useContext(UserContext);

  if (user.role !== 'admin') {
    return <p>You do not have permission to create news.</p>;
  }

  return (
    <div>
      <h1>Create News</h1>
      {/* Form for creating news */}
    </div>
  );
};

export default NewsCreation;