class ArrayQueue {
  constructor() {
    this.storage = [];
    this.head = 0;
    this.tail = 0;
  }

  enqueue(element) {
    this.storage[this.tail] = element;
    this.tail += 1;
  }

  dequeue() {
    if (this.head === this.tail) {
      return undefined;
    }

    const element = this.storage[this.head];
    this.storage[this.head] = undefined;
    this.head += 1;
    return element;
  }

  count() {
    return this.tail - this.head;
  }

  forEach(callback) {
    for (let i = this.head; i < this.tail; i += 1) {
      const index = i - this.head;
      callback(this.storage[i], index, this);
    }
  }
}

export default ArrayQueue;