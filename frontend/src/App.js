import { useEffect, useState } from "react";

import "./App.css";
import BookingForm from "./components/BookingForm";
import Status from "./components/Status";
import Seats from "./service/Seats";

function Loading() {
  return (
    <>
      {Array(80)
        .fill(1)
        .map((_, idx) => (
          <div key={idx} title="Loading..." className="seat loading">
            {idx + 1}
          </div>
        ))}
    </>
  );
}

function App() {
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [seats, setSeats] = useState([]);
  const [allocatedPosition, setAllocatedPosition] = useState("");

  async function handelSubmit(event) {
    event.preventDefault();
    if (numberOfSeats > 7) {
      setError("Can't be more than 7");
      return;
    }
    const data = await Seats.reserveSeats(numberOfSeats);
    if (data.ok) {
      setAllocatedPosition(data?.allocatedPosition?.join(" "));
      setSeats(data.seats);
    } else {
      setError(data.message);
    }
  }
  async function fetchSeatData() {
    setIsLoading(true);
    try {
      const data = await Seats.getAllSeats();
      setIsLoading(false);
      if (data.coach === undefined || data.coach.length === 0) {
        setError("Please try again");
        setSeats([]);
      } else {
        setSeats(data.coach[0].seats);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function reset() {
    await Seats.reset();
    setSeats((pre) => {
      const emptySeats = pre.map((d) => {
        d.isAvailable = true;
        return d;
      });
      return emptySeats;
    });
    fetchSeatData();
  }

  useEffect(() => {
    fetchSeatData();
  }, []);

  return (
    <div className="container mt-3">
      <h1>Train Reservation</h1>
      <p>D2C assignment</p>
      <div className="flex mt-2 switch">
        <div className="seat-wrapper">
          {isLoading ? (
            <Loading />
          ) : (
            seats?.map(({ number, isAvailable, _id }) => (
              <div
                key={_id}
                className={isAvailable ? "seat unreserved" : "seat reserved"}
                title={isAvailable ? "Unreserved" : "Reserved"}
              >
                {number}
              </div>
            ))
          )}
        </div>
        <div className="ml-md-3 my-sm-2">
          <Status />
          <BookingForm
            handelSubmit={handelSubmit}
            error={error}
            setError={setError}
            setNumberOfSeats={setNumberOfSeats}
            numberOfSeats={numberOfSeats}
            reset={reset}
            allocatedPosition={allocatedPosition}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
