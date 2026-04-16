import React from 'react';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { UploadPanel } from './components/UploadPanel';
import { PlaylistView } from './components/PlaylistView';
import { PlayerControls } from './components/PlayerControls';
import { CacheStatus } from './components/CacheStatus';
import './styles/App.css';

const App: React.FC = () => {
  const {
    songs,
    currentSong,
    isPlaying,
    handleAddSong,
    handleRemoveSong,
    handleNext,
    handlePrevious,
    handleTogglePlay,
    handleSetCurrent,
    handleClearPlaylist,
    cacheStatus
  } = useAudioPlayer();

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h1 style={{ color: 'var(--accent)', fontSize: '1.5rem' }}>MusicDLL</h1>
        <UploadPanel onUpload={handleAddSong} />
        <CacheStatus status={cacheStatus} />
        <button className="btn-danger" onClick={handleClearPlaylist} style={{ width: '100%' }}>
          Vaciar Playlist
        </button>
      </aside>

      <main className="main-content">
        <PlaylistView 
          songs={songs}
          currentSong={currentSong}
          onRemove={handleRemoveSong}
          onSelect={handleSetCurrent}
        />
      </main>

      <PlayerControls 
        currentSong={currentSong}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
};

export default App;
