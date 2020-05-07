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
    const letter = this.state.enqueueValue;
    this.state.arrayQueue.enqueue(letter);

    this.setState({
      enqueueValue: getNextLetter(letter)
    });

    this.mutableStateChanged();
  }

  dequeueValue = () => {
    const aqValue = this.state.arrayQueue.dequeue();
    console.log(`dequeued ${aqValue}`);

    this.setState({arrayQueueLastDequeued: aqValue });

    this.mutableStateChanged();
  }

  cancel = () => {
    console.log('canceling selected');
    if (this.state.arrayQueueSelected !== undefined) {
      this.state.arrayQueue.cancel(this.state.arrayQueueSelected);
      this.mutableStateChanged();
    }
  }

  selectArrayQueueCell = (index) => {
    console.log(`Selecting AQ ${index}`);
    this.setState({ arrayQueueSelected: index });
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
          selectedIndex={this.state.arrayQueueSelected}
          handleCellClick={this.selectArrayQueueCell}
        />
      </main>
    );
  }
}

export default App;