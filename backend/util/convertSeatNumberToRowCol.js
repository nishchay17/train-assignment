exports.convertSeatNumberToRowCol = function (seatNumber) {
  const SEAT_PER_ROW = process.env.SEAT_PER_ROW;
  const rowNumber = seatNumber / SEAT_PER_ROW;
  const ColNumber = seatNumber % SEAT_PER_ROW;
  return { rowNumber: Math.floor(rowNumber) + 1, ColNumber: ColNumber + 1 };
};
