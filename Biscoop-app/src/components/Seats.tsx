import React, { useState } from 'react';

// You can define a type for the seat if desired
type Seat = {
  id: number;
  reserved: boolean;
};

const Seats: React.FC = () => {
  // Initialize state: an array of 100 seats, all available initially
  const [seats, setSeats] = useState<Seat[]>(
    Array.from({ length: 100 }, (_, i) => ({ id: i, reserved: false }))
  );

  // Toggle the reserved state of a seat by id
  const toggleReservation = (id: number) => {
    setSeats(prevSeats =>
      prevSeats.map(seat =>
        seat.id === id ? { ...seat, reserved: !seat.reserved } : seat
      )
    );
  };

  return (
    <div id="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '5px' }}>
      {seats.map(seat => (
        <div
          key={seat.id}
          className={`box ${seat.reserved ? 'reserved' : ''}`}
          onClick={() => toggleReservation(seat.id)}
          style={{
            backgroundColor: seat.reserved ? 'grey' : 'lightblue',
            cursor: 'pointer',
            userSelect: 'none',
            padding: '10px',
            textAlign: 'center',
          }}
        >
          {100 - seat.id}
        </div>
      ))}
    </div>
  );
};

export default Seats;
