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
    // if you put this._sentinel.prev = node; here it breaks - why?
    // if you set this._sentinel.prev to node,
    // THEN this.tail().next,
    // this tail returns this _sentinel.prev
    // so it will set
    // this._tail.next to the value you just
    // set in this_sentine.prev
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
    // removing head and tail is special case!
    // update the reference and deal w/ undefined next or previous
    let current = this._head();

    // we are removing head
    if (current === node) {

      this._sentinel.next = this._sentinel;
      this._sentinel.previous = this._sentinel;
      return node;
    }

    while (current !== node) {
      current = current.next;
    }

    current.next.prev = current.prev;
    current.prev.next = current.next;
    return node.element;
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