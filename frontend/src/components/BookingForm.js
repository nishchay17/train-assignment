import React from "react";

export default function BookingForm({
  handelSubmit,
  error,
  setError,
  numberOfSeats,
  setNumberOfSeats,
  reset,
  allocatedPosition,
}) {
  return (
    <div className="mt-3">
      <form id="numberForm" onSubmit={handelSubmit}>
        <label htmlFor="numberOfSeats">Enter number of seats</label>
        <br />
        <input
          name="numberOfSeats"
          type="number"
          id="numberOfSeats"
          className="mt-1"
          value={numberOfSeats}
          min={1}
          onChange={(e) => {
            setNumberOfSeats(e.target.value);
            setError("");
          }}
        />
        <br />

        {<div style={{ color: "red", marginTop: "0.5rem" }}>{error}</div>}
        {
          <div style={{ marginTop: "0.5rem" }}>
            Allocated seats: {allocatedPosition}
          </div>
        }
        <button className="mt-1" type="submit" form="numberForm">
          Reserve
        </button>
        <button
          className="mt-1 ml-1 btn-red"
          type="button"
          form="numberForm"
          title="Delete all reservations"
          onClick={reset}
        >
          Reset all reserves
        </button>
      </form>
    </div>
  );
}
