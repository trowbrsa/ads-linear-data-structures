import React from 'react';

import ArrayQueue from '../data_structures/array_queue';
import DLLQueue from '../data_structures/dll_queue';

import ArrayQueueDisplay from './ArrayQueueDisplay';
import DLLQueueDisplay from './DLLQueueDisplay';

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
      arrayQueue: new ArrayQueue(),
      dllQueue: new DLLQueue(),
    };
  }

  mutableStateChanged() {
    this.setState({
      sequence: this.state.sequence + 1,
    });
  }

  enqueue = () => {
    console.log(`enqueueing ${this.state.enqueueValue}`);
    const record = {
      letter: this.state.enqueueValue,
      id: this.state.sequence,
    };
    record.aqTicket = this.state.arrayQueue.enqueue(record);
    record.dqTicket = this.state.dllQueue.enqueue(record);

    this.setState({
      enqueueValue: getNextLetter(record.letter)
    });

    this.mutableStateChanged();
  }

  dequeue = () => {
    const aqRecord = this.state.arrayQueue.dequeue();
    const dqRecord = this.state.dllQueue.dequeue();
    console.log(`dequeued ${aqRecord}`);

    this.setState({
      arrayQueueLastDequeued: aqRecord?.letter,
      dllQueueLastDequeued: dqRecord?.letter
    });

    this.mutableStateChanged();
  }

  cancel = () => {
    console.log('canceling selected');
    if (this.state.selected) {
      this.state.arrayQueue.cancel(this.state.selected.aqTicket);
      this.state.dllQueue.cancel(this.state.selected.dqTicket);
      this.mutableStateChanged();
    }
  }

  selectCell = (record) => {
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
            <button onClick={this.enqueue}>Enqueue</button>
            <button onClick={this.dequeue}>Dequeue</button>
            <button onClick={this.cancel}>Cancel</button>
          </div>
        </header>
        <ArrayQueueDisplay
          queue={this.state.arrayQueue}
          lastDequeue={this.state.arrayQueueLastDequeued}
          selected={this.state.selected}
          handleCellClick={this.selectCell}
        />
        <DLLQueueDisplay
          queue={this.state.dllQueue}
          lastDequeue={this.state.dllQueueLastDequeued}
          selected={this.state.selected}
          handleCellClick={this.selectCell}
        />
      </main>
    );
  }
}

export default App;