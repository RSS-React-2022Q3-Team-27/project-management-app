import React from 'react';
import { useParams } from 'react-router-dom';

export const Board = () => {
  const params = useParams();

  return <div>Board Page. Board: {params.id}</div>;
};
