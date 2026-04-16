import React from 'react';

interface Props {
  status: {
    usedMB: string;
    totalMB: number;
    count: number;
    maxCount: number;
  };
}

export const CacheStatus: React.FC<Props> = ({ status }) => {
  const percentageMemory = (parseFloat(status.usedMB) / status.totalMB) * 100;

  return (
    <div className="card status-bar">
      <h3>Estado de Caché</h3>
      <p>Canciones: {status.count} / {status.maxCount}</p>
      <p>Memoria: {status.usedMB} MB / {status.totalMB} MB</p>
      <div className="progress-bg">
        <div 
          className="progress-fill" 
          style={{ width: `${Math.min(percentageMemory, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};
