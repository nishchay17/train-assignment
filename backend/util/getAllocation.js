exports.getAllocation = function (seats, numberOfSeats) {
  let allocatedPosition = [];

  let preRow = 0;
  for (
    let i = 0;
    i < seats.length && allocatedPosition.length < numberOfSeats;
    ++i
  ) {
    let row = parseInt(i / 7) + 1;
    if (!seats[i].isAvailable) {
      allocatedPosition = [];
      continue;
    }
    if (row != preRow) {
      allocatedPosition = [];
    }
    preRow = row;
    allocatedPosition.push(i + 1);
  }

  for (
    let i = 0;
    i < seats.length && allocatedPosition.length < numberOfSeats;
    i++
  ) {
    if (seats[i].isAvailable) {
      allocatedPosition.push(i + 1);
    }
  }

  return allocatedPosition;
};
