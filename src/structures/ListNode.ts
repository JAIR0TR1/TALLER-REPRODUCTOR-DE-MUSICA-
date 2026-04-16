import { Song } from '../models/Song';

export class ListNode {
  public value: Song;
  public next: ListNode | null = null;
  public prev: ListNode | null = null;

  constructor(song: Song) {
    this.value = song;
  }
}
