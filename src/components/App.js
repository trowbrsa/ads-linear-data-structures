import React from 'react';
import ArrayQueueDisplay from './ArrayQueueDisplay';
import ArrayQueue from '../data_structures/array_queue';

const LETTERS = [];
for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i += 1) {
  LETTERS.push(String.fromCharCode(i));
}
const getNextLetter = (letter) => {
  const letterIndex = (LETTERS.indexOf(letter) + 1) % LETTERS.length;
  return LETTERS[letterIndex];
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enqueueValue: LETTERS[0],
      sequence: 0,
      arrayQueue: new ArrayQueue()
    };

    // TODO: Plan for DLLQueue:
    // store objects, add cancellation ticket to object after insert
  }

  mutableStateChanged() {
    this.setState({
      sequence: this.state.sequence + 1,
    });
  }

  enqueueValue = () => {
    console.log(`enqueueing ${this.state.enqueueValue}`);
    const record = {
      letter: this.state.enqueueValue,
    };
    record.aqTicket = this.state.arrayQueue.enqueue(record);

    this.setState({
      enqueueValue: getNextLetter(record.letter)
    });

    this.mutableStateChanged();
  }

  dequeueValue = () => {
    const aqRecord = this.state.arrayQueue.dequeue();
    console.log(`dequeued ${aqRecord}`);

    this.setState({arrayQueueLastDequeued: aqRecord?.letter });

    this.mutableStateChanged();
  }

  cancel = () => {
    console.log('canceling selected');
    if (this.state.selected) {
      this.state.arrayQueue.cancel(this.state.selected.aqTicket);
      this.mutableStateChanged();
    }
  }

  selectArrayQueueCell = (record) => {
    if (this.state.selected === record) {
      console.log(`Deselecting ${record?.letter}`);
      this.setState({ selected: undefined });
    } else {
      console.log(`Selecting ${record?.letter}`);
      this.setState({ selected: record });
    }
  }

  render() {
    return (
      <main>
        <header className="header">
          <h1>Queues</h1>
          <div className="knobs">
            <button onClick={this.enqueueValue}>Enqueue</button>
            <button onClick={this.dequeueValue}>Dequeue</button>
            <button onClick={this.cancel}>Cancel</button>
          </div>
        </header>
        <ArrayQueueDisplay
          queue={this.state.arrayQueue}
          lastDequeue={this.state.arrayQueueLastDequeued}
          selected={this.state.selected}
          handleCellClick={this.selectArrayQueueCell}
        />
      </main>
    );
  }
}

export default App;