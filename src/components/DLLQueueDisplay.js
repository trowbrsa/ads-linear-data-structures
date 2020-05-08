import React from 'react';

import QueueCell from './QueueCell';

import arrowImage from './assets/arrows.png';

const arrows = (key) => (
  <img
    key={`arrows_${key}`}
    src={arrowImage}
    alt="doubly linked list pointers"
    className="dll-arrows"
  />
);

const DLLQueueDisplay = ({ queue, lastDequeue = "none", selected, handleCellClick }) => {
  // Our Queue interface doesn't include a map, so we take the scenic route
  const cells = [];
  queue.forEach((record, i) => {
    cells.push(
      <React.Fragment key={record.id}>
        <QueueCell
          key={record.id}
          value={record.letter}
          isSelected={record && record === selected}
          isHead={i === 0}
          isTail={i === queue.count()}
          onClick={() => handleCellClick(record)}
        />
        {arrows(record.id)}
      </React.Fragment>
    );
  });

  return (
    <div className="dllqueue queue-display">
      <h2 className="queue-title">DLL Queue</h2>
      <div className="queue-metadata">
        <p className="queue-metadata--entry">Count: {queue.count()}</p>
        <p className="queue-metadata--entry">Size: {queue.count() + 1}</p>
        <p className="queue-metadata--entry">Last dequeue: <span className="last-dequeue">{lastDequeue}</span></p>
      </div>
      <div className="queue-storage">
        <QueueCell key="sentinel-head" />
        {arrows('sentinel')}
        {cells}
        <QueueCell key="sentinel-tail" />
      </div>
    </div>
  );
};

export default DLLQueueDisplay;