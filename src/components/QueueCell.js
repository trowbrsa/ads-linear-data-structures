import React from 'react';

const QueueCell = ({ value, isHead, isTail, isSelected, onClick }) => {
  let classList = ["queue-cell"];

  if (isHead) {
    classList.push("head");
  }

  if (isTail) {
    classList.push("tail");
  }

  if (isSelected) {
    classList.push("selected");
  }

  if (value === undefined) {
    classList.push("empty");
    value = 'X';
  }

  return (
    <div
      className={classList.join(' ')}
      onClick={onClick}
      >
      <p>{value}</p>
    </div>
  );
};

export default QueueCell;