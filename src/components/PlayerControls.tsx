import React from 'react';
import { Song } from '../models/Song';

interface Props {
  currentSong: Song | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const PlayerControls: React.FC<Props> = ({ 
  currentSong, 
  isPlaying, 
  onTogglePlay, 
  onNext, 
  onPrevious 
}) => {
  return (
    <div className="player-bar">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontWeight: 600 }}>{currentSong?.title || "No hay canción seleccionada"}</span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          {currentSong ? currentSong.fileName : "Sube música para empezar"}
        </span>
      </div>

      <div className="controls-group">
        <button className="nav-btn" onClick={onPrevious} title="Anterior">
          ⏮
        </button>
        <button className="play-btn" onClick={onTogglePlay} title={isPlaying ? "Pausar" : "Reproducir"}>
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button className="nav-btn" onClick={onNext} title="Siguiente">
          ⏭
        </button>
      </div>

      <div style={{ flex: 1, textAlign: 'right' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          {currentSong ? "Modo: Lista Doble" : ""}
        </span>
      </div>
    </div>
  );
};
