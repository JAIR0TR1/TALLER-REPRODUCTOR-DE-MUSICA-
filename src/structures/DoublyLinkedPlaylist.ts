import { ListNode } from './ListNode';
import { Song } from '../models/Song';

export class DoublyLinkedPlaylist {
  public head: ListNode | null = null;
  public tail: ListNode | null = null;
  public current: ListNode | null = null;
  public length: number = 0;

  addFirst(song: Song): void {
    const newNode = new ListNode(song);
    if (!this.head) {
      this.head = this.tail = this.current = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
  }

  addLast(song: Song): void {
    const newNode = new ListNode(song);
    if (!this.tail) {
      this.head = this.tail = this.current = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  insertAt(index: number, song: Song): void {
    if (index <= 0) return this.addFirst(song);
    if (index >= this.length) return this.addLast(song);

    const newNode = new ListNode(song);
    let temp = this.head;
    for (let i = 0; i < index; i++) {
      temp = temp!.next;
    }

    newNode.prev = temp!.prev;
    newNode.next = temp;
    temp!.prev!.next = newNode;
    temp!.prev = newNode;
    this.length++;
  }

  removeById(id: string): Song | null {
    let temp = this.head;
    while (temp) {
      if (temp.value.id === id) {
        const song = temp.value;
        this.removeNode(temp);
        return song;
      }
      temp = temp.next;
    }
    return null;
  }

  removeAt(index: number): Song | null {
    if (index < 0 || index >= this.length) return null;
    let temp = this.head;
    for (let i = 0; i < index; i++) {
      temp = temp!.next;
    }
    const song = temp!.value;
    this.removeNode(temp!);
    return song;
  }

  private removeNode(node: ListNode): void {
    // Si eliminamos la canción actual, debemos mover el puntero current
    if (node === this.current) {
      this.current = node.next || node.prev || null;
    }

    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;

    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;

    this.length--;
  }

  next(): Song | null {
    if (this.current?.next) {
      this.current = this.current.next;
      return this.current.value;
    }
    return null;
  }

  previous(): Song | null {
    if (this.current?.prev) {
      this.current = this.current.prev;
      return this.current.value;
    }
    return null;
  }

  getCurrent(): Song | null {
    return this.current?.value || null;
  }

  setCurrent(id: string): void {
    let temp = this.head;
    while (temp) {
      if (temp.value.id === id) {
        this.current = temp;
        return;
      }
      temp = temp.next;
    }
  }

  toArray(): Song[] {
    const arr: Song[] = [];
    let temp = this.head;
    while (temp) {
      arr.push(temp.value);
      temp = temp.next;
    }
    return arr;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.current = null;
    this.length = 0;
  }
}
