import React from "react";
interface MovieInfoProps {
  title: string;
  duration: string;
  rating: string;
  genre: string;
  description?: string;
  stars?: string;
  className?: string;
  posterClass?: string;
  textClass?: string;
}

const MovieInfo: React.FC<MovieInfoProps> = ({
  title,
  duration,
  rating,
  genre,
  description,
  stars,
  className = "",
  posterClass = "",
  textClass = "",
}) => {
  const posterPath = "images/deze.png";
  return (
    <div className={`${className}`}>
      <img
        className={posterClass}
        src={posterPath}
        alt={title}
      />

      <div className={textClass}>
        <h1>{title}</h1>

        <div><span className="label">Duration:</span> {duration}</div>
        <div><span className="label">PG:</span> {rating}</div>
        <div><span className="label">Genre:</span> {genre}</div>
        {description && (
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
