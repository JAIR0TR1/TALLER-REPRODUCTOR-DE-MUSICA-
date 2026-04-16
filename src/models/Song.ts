export interface Song {
  id: string;
  title: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  blobUrl: string;
  duration?: number;
  createdAt: Date;
}
