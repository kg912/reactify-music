import React from 'react';

const Icon = ({ name = '', size = '', src = '' }) => {
  // @ts-ignore
  return <ion-icon name={name} size={size} src={src} />;
};

export default Icon;
