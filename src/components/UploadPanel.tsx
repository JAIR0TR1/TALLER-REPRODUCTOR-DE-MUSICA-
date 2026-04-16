import React, { useState } from 'react';

interface Props {
  onUpload: (file: File, pos: 'start' | 'end' | 'index', index?: number) => void;
}

export const UploadPanel: React.FC<Props> = ({ onUpload }) => {
  const [position, setPosition] = useState<'start' | 'end' | 'index'>('end');
  const [index, setIndex] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file, position, position === 'index' ? index : undefined);
      e.target.value = ''; // Reset input
    }
  };

  return (
    <div className="card">
      <h3>Subir Canción</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>Insertar en:</label>
        <select value={position} onChange={(e) => setPosition(e.target.value as any)}>
          <option value="start">Al Inicio</option>
          <option value="end">Al Final</option>
          <option value="index">Posición Específica</option>
        </select>

        {position === 'index' && (
          <input 
            type="number" 
            min="0" 
            value={index} 
            onChange={(e) => setIndex(parseInt(e.target.value))}
            placeholder="Índice"
          />
        )}

        <input 
          type="file" 
          accept="audio/*" 
          onChange={handleFileChange} 
          style={{ marginTop: '10px' }}
        />
      </div>
    </div>
  );
};
