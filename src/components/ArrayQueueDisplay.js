import React from 'react';

import QueueCell from './QueueCell';

const ArrayQueueDisplay = ({ queue, lastDequeue="none", selected, handleCellClick }) => {
  return (
    <div className="arrayqueue queue-display">
      <h2 className="queue-title">Array Queue</h2>
      <div className="queue-metadata">
        <p className="queue-metadata--entry head">Head: {queue.head}</p>
        <p className="queue-metadata--entry tail">Tail: {queue.tail}</p>
        <p className="queue-metadata--entry">Count: {queue.count()}</p>
        <p className="queue-metadata--entry">Size: {queue.storage.length + 1}</p>
        <p className="queue-metadata--entry">Last dequeue: <span className="last-dequeue">{lastDequeue}</span></p>
      </div>
      <div className="queue-storage">
        {
          queue.storage.map((record, i) => (
            <QueueCell
              key={i}
              value={record?.letter}
              isSelected={record && record === selected}
              isHead={i === queue.head}
              onClick={() => handleCellClick(record)}
            />
          ))
        }
        <QueueCell
          key={queue.tail}
          isTail={true}
          onClick={handleCellClick}
        />
      </div>
    </div>
  );
};

export default ArrayQueueDisplay;