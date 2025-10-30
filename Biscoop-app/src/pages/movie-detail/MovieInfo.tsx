import React from "react";
import { hashCode } from "../../utils/image-hascode";
interface MovieInfoProps {
  poster?: string;
  title: string;
  duration: number;
  rating: string;
  genre: string;
  includeDescription: boolean;
  description?: string;
  stars?: string;
  className?: string;
  posterClass?: string;
  textClass?: string;
}

const MovieInfo: React.FC<MovieInfoProps> = ({
  poster,
  title,
  duration,
  rating,
  genre,
  includeDescription,
  description,
  stars,
  className = "",
  posterClass = "",
  textClass = "",
}) => {
  const posterPath = `/images/movie_${hashCode(title)}.png`;
  return (
    <div className={`${className}`}>
      <img
        className={posterClass}
        src={poster ? poster : posterPath}
        alt={title}
      />

      <div className={textClass}>
        <h1>{title}</h1>

        <div><span className="label">Duration:</span> {duration} min</div>
        <div><span className="label">PG:</span> {rating}</div>
        <div><span className="label">Genre:</span> {genre}</div>
        {includeDescription == true && (
          <div>
            <span className="label">Description:</span> {description}
          </div>
        )}
        {stars && (
          <div>
            <span className="label">rating:</span> {stars}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieInfo;
