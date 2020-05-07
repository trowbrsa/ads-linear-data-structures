import React from 'react';
import sizeof from 'object-sizeof';
import prettyBytes from 'pretty-bytes';

import ArrayQueueCell from './ArrayQueueCell';

const ArrayQueueDisplay = ({ queue, lastDequeue="none", selectedIndex, handleCellClick }) => {
  return (
    <div className="arrayqueue-display">
      <h2 className="arrayqueue-title">ArrayQueue</h2>
      <div className="arrayqueue-metadata">
        <p className="arrayqueue-metadata--entry head">Head: {queue.head}</p>
        <p className="arrayqueue-metadata--entry tail">Tail: {queue.tail}</p>
        <p className="arrayqueue-metadata--entry">Count: {queue.count()}</p>
        <p className="arrayqueue-metadata--entry">Size: {queue.storage.length}</p>
        <p className="arrayqueue-metadata--entry">Last dequeue: <span className="last-dequeue">{lastDequeue}</span></p>
      </div>
      <div className="arrayqueue-storage">
        {
          queue.storage.map((value, i) => (
            <ArrayQueueCell
              key={i}
              value={value}
              isSelected={i === selectedIndex}
              isHead={i === queue.head}
              onClick={() => handleCellClick(i)}
            />
          ))
        }
        <ArrayQueueCell
          key={queue.tail}
          isTail={true}
          onClick={handleCellClick}
        />
      </div>
    </div>
  );
};

export default ArrayQueueDisplay;