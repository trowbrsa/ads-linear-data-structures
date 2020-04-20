class DoublyLinkedList {
  Node = class DLLNode {
    constructor({element=undefined, next=this, prev=this, isSentinel=false}) {
      this.element = element;
      this.next = next;
      this.prev = prev;
      this._active = !isSentinel;
    }
  
    remove() {
      if (this._active) {
        this.prev.next = this.next;
        this.next.prev = this.prev;
        this._active = false;
        return this.element;
      }
    }
  }

  constructor() {
    this._sentinel = new this.Node({isSentinel: true});
  }

  _head() {
    return this._sentinel.next;
  }

  _tail() {
    return this._sentinel.prev;
  }

  insertHead(element) {
    const node = new this.Node({element, next: this._head(), prev: this._sentinel});
    this._head().prev = node;
    this._sentinel.next = node;
    return node;
  }

  insertTail(element) {
    const node = new this.Node({element, next: this._sentinel, prev: this._tail()});
    this._tail().next = node;
    this._sentinel.prev = node;
    return node;
  }

  removeHead() {
    return this._head().remove();
  }

  removeTail() {
    return this._tail().remove();
  }

  remove(node) {
    if (node.remove) {
      return node.remove();
    }
  }

  forEach(callback) {
    let i = 0;
    let node = this._head();
    while (node !== this._sentinel) {
      callback(node.element, i, this);
      i += 1;
      node = node.next;
    }
  }

  count() {
    let count = 0;
    this.forEach(() => count += 1);
    return count;
  }
}

export default DoublyLinkedList;