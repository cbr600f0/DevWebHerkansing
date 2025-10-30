import React from "react";
import type { ShowProp, ZaalProp } from "../../utils/fake-data";
import { fakeShows, fakeZalen } from "../../utils/fake-data";
import { formatDateForShowing } from "../../utils/date-fromatter";

interface ShowInfoProps {
  movieId: string;
  button: boolean;
}

const ShowInfo: React.FC<ShowInfoProps> = ({ movieId, button }) => {
  const showsForMovie: ShowProp[] = fakeShows.filter(s => s.movieId === movieId);

  return (
    <div className="voorstelling-info">
      {showsForMovie.map((show) => {
        const zaal: ZaalProp | undefined = fakeZalen.find(z => z.id === show.zaalId);
        const totalSeats = (zaal?.rijen ?? 0) * (zaal?.stoelen_per_rij ?? 0);

        return (
          <div key={show.id} className="voorstelling-card">
            <div>zaal: {zaal?.naam ?? "N/A"}</div>
            <div>Stoelen: {totalSeats}</div>
            <div>start date: {formatDateForShowing(show.start_date)}</div>
            <div>end date: {formatDateForShowing(show.end_date)}</div>
            {button && <button>Choose seats</button>}
          </div>
        );
      })}
    </div>
  );
};

export default ShowInfo;
