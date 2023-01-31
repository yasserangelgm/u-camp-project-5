import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div>
      Unauthorized
      <button onClick={goBack}>Atras</button>
    </div>
  );
};
