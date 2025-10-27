import React, { useState } from "react";

export interface Showtime {
  time: string;
  room: string;
  total: number;
  available: number;
}

interface ShowSelectorProps {
  showtimes: Showtime[];
}

const ShowSelector: React.FC<ShowSelectorProps> = ({ showtimes }) => {
  const [selectedShowTime, setSelectedShowTime] = useState<Showtime | null>(null);

  return (
    <div>
      {selectedShowTime && (
        <div id="info">
          <div>
            <span className="label">Room:</span> {selectedShowTime.room}
          </div>
          <div>
            <span className="label">Total Seats:</span> {selectedShowTime.total}
          </div>
          <div>
            <span className="label">Seats Available:</span> {selectedShowTime.available}
          </div>
        </div>
      )}

      <div className="info showtimes">
        {showtimes.map((s) => (
          <button
            key={s.time}
            onClick={() => setSelectedShowTime(s)}
          >
            {`${s.time.slice(0, 2)}:${s.time.slice(2)}`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShowSelector;
