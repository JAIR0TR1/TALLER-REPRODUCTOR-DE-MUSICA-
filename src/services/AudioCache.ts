import { Song } from '../models/Song';

export class AudioCacheService {
  private static readonly MAX_SONGS = 15;
  private static readonly MAX_FILE_SIZE = 12 * 1024 * 1024; // 12MB
  private static readonly MAX_TOTAL_SIZE = 80 * 1024 * 1024; // 80MB

  private static currentSize = 0;
  private static songsCount = 0;

  static validateAndPrepare(file: File): { error?: string; song?: Song } {
    if (this.songsCount >= this.MAX_SONGS) {
      return { error: "Límite de 15 canciones alcanzado." };
    }
    if (file.size > this.MAX_FILE_SIZE) {
      return { error: `El archivo "${file.name}" excede los 12MB permitidos.` };
    }
    if (this.currentSize + file.size > this.MAX_TOTAL_SIZE) {
      return { error: "No hay suficiente memoria en la caché (Límite 80MB)." };
    }

    const song: Song = {
      id: crypto.randomUUID(),
      title: file.name.replace(/\.[^/.]+$/, ""),
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      blobUrl: URL.createObjectURL(file),
      createdAt: new Date()
    };

    this.currentSize += file.size;
    this.songsCount++;

    return { song };
  }

  static release(song: Song): void {
    URL.revokeObjectURL(song.blobUrl);
    this.currentSize -= song.fileSize;
    this.songsCount--;
  }

  static clearAll(songs: Song[]): void {
    songs.forEach(s => URL.revokeObjectURL(s.blobUrl));
    this.currentSize = 0;
    this.songsCount = 0;
  }

  static getStatus() {
    return {
      usedMB: (this.currentSize / (1024 * 1024)).toFixed(2),
      totalMB: 80,
      count: this.songsCount,
      maxCount: 15
    };
  }
}
