import { useState, useRef, useEffect } from 'react';
import { DoublyLinkedPlaylist } from '../structures/DoublyLinkedPlaylist';
import { Song } from '../models/Song';
import { AudioCacheService } from '../services/AudioCache';

export const useAudioPlayer = () => {
  const [playlist] = useState(() => new DoublyLinkedPlaylist());
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    
    const handleEnded = () => {
      handleNext();
    };

    audioRef.current.addEventListener('ended', handleEnded);
    return () => {
      audioRef.current?.removeEventListener('ended', handleEnded);
      audioRef.current?.pause();
    };
  }, []);

  const updateState = () => {
    setSongs(playlist.toArray());
    setCurrentSong(playlist.getCurrent());
  };

  const playSong = (song: Song | null) => {
    if (!song || !audioRef.current) return;
    
    audioRef.current.src = song.blobUrl;
    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(err => console.error("Error playing audio:", err));
  };

  const handleTogglePlay = () => {
    if (!audioRef.current || !currentSong) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAddSong = (file: File, position: 'start' | 'end' | 'index', index?: number) => {
    const { error, song } = AudioCacheService.validateAndPrepare(file);
    if (error) return alert(error);
    if (!song) return;

    if (position === 'start') playlist.addFirst(song);
    else if (position === 'end') playlist.addLast(song);
    else if (index !== undefined) playlist.insertAt(index, song);

    updateState();
    if (playlist.length === 1) {
       // Si es la primera, no auto-reproducir para respetar políticas de navegador, 
       // pero dejarla lista.
    }
  };

  const handleRemoveSong = (id: string) => {
    const removedSong = playlist.removeById(id);
    if (removedSong) {
      AudioCacheService.release(removedSong);
      updateState();
      
      const newCurrent = playlist.getCurrent();
      if (newCurrent && isPlaying) {
        playSong(newCurrent);
      } else if (!newCurrent) {
        audioRef.current?.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleNext = () => {
    const nextSong = playlist.next();
    if (nextSong) {
      updateState();
      playSong(nextSong);
    }
  };

  const handlePrevious = () => {
    const prevSong = playlist.previous();
    if (prevSong) {
      updateState();
      playSong(prevSong);
    }
  };

  const handleSetCurrent = (id: string) => {
    playlist.setCurrent(id);
    updateState();
    playSong(playlist.getCurrent());
  };

  const handleClearPlaylist = () => {
    AudioCacheService.clearAll(playlist.toArray());
    playlist.clear();
    updateState();
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  return {
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
    cacheStatus: AudioCacheService.getStatus()
  };
};
