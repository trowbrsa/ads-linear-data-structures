import React from 'react';

const ArrayQueueCell = ({ value, isHead, isTail, isSelected, onClick }) => {
  let classList = ["arrayqueue-display--cell"];

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
      <p className="arrayqueue-display--cell-value">{value}</p>
    </div>
  );
};

export default ArrayQueueCell;