class DLLNode {
  constructor({ element = undefined, next = this, prev = this, isSentinel = false }) {
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

class DoublyLinkedList {
  constructor(Node = DLLNode) {
    this.Node = Node;
    this._sentinel = new this.Node({ isSentinel: true });
  }

  _head() {
    // head is not getting updated with insertHead
    return this._sentinel.next;
  }

  _tail() {
    return this._sentinel.prev;
  }

  insertHead(element) {
    const node = new DLLNode({ element, next: this._head(), prev: this._sentinel });
    this._head().prev = node;
    this._sentinel.next = node;

    return node;
  }

  insertTail(element) {
    const node = new DLLNode({ element, next: this._sentinel, prev: this._tail() });
    this._tail().next = node;
    this._sentinel.prev = node;
    return node;
  }

  removeHead() {
    return this._head().remove();
  }

  removeTail() {
    return this._tail().remove()
  }

  remove(node) {
    if (node.remove) {
      return node.remove(node);
    }
  }

  // skip over the ones we've set as undefined
  forEach(callback, linkedList = this) {
    let node = this._head();
    let index = 0;
    while (node !== this._sentinel) {
      callback(node.element, index, linkedList);
      index++;
      node = node.next;
    }
  }

  count() {
    let count = 0;
    this.forEach(() => count += 1)
    return count;
  }
}

export default DoublyLinkedList;