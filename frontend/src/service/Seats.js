class Seats {
  static getAllSeats() {
    return fetch(`${process.env.REACT_APP_BACKEND}reservation/all-seats`)
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static reserveSeats(numberOfSeats) {
    return fetch(`${process.env.REACT_APP_BACKEND}reservation/reserve`, {
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
    return fetch(`${process.env.REACT_APP_BACKEND}reservation/reset`)
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default Seats;
