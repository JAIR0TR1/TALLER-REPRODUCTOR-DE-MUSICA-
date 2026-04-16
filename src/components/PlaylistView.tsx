import React from 'react';
import { Song } from '../models/Song';

interface Props {
  songs: Song[];
  currentSong: Song | null;
  onRemove: (id: string) => void;
  onSelect: (id: string) => void;
}

export const PlaylistView: React.FC<Props> = ({ songs, currentSong, onRemove, onSelect }) => {
  return (
    <div>
      <h3>Tu Playlist</h3>
      {songs.length === 0 ? (
        <p style={{ color: 'var(--text-dim)' }}>La playlist está vacía. Sube algunas canciones.</p>
      ) : (
        songs.map((song, index) => (
          <div 
            key={song.id} 
            className={`song-item ${currentSong?.id === song.id ? 'active' : ''}`}
          >
            <div style={{ width: '30px', color: 'var(--text-dim)' }}>{index}</div>
            <div className="song-info">
              <span className="song-title">{song.title}</span>
              <span className="song-meta">
                {(song.fileSize / (1024 * 1024)).toFixed(2)} MB • {song.mimeType}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className="btn-outline" 
                onClick={() => onSelect(song.id)}
                disabled={currentSong?.id === song.id}
              >
                Reproducir
              </button>
              <button 
                className="btn-danger" 
                onClick={() => onRemove(song.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
