import React from "react";

function Status() {
  return (
    <div>
      <h3>Status</h3>
      <div className="flex mt-1 align-center">
        <p>Reserved</p>
        <div className="seat reserved ml-1">X</div>
      </div>
      <div className="flex mt-1 align-center">
        <p>Unreserved</p>
        <div className="seat unreserved ml-1 ">X</div>
      </div>
      <div className="flex mt-1 align-center">
        <p>Loading</p>
        <div className="seat loading ml-1 ">X</div>
      </div>
    </div>
  );
}

export default Status;
