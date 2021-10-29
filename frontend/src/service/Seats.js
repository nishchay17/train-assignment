class Seats {
  static getAllSeats() {
    return fetch("http://localhost:3000/api/reservation/all-seats")
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static reserveSeats(numberOfSeats) {
    return fetch("http://localhost:3000/api/reservation/reserve", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ numberOfSeats }),
    })
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static reset() {
    return fetch("http://localhost:3000/api/reservation/reset")
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default Seats;
