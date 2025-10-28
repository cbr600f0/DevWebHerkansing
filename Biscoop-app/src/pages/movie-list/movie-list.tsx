import {movieList} from "../../utils/fake-data"
import { formatDateForShowing } from "../../utils/date-fromatter";
import {Link} from "react-router-dom";
import "./movie-list.css"
import MovieInfo from "../movie-detail/MovieInfo";

type Review = {
  name: string;
  text: string;
  rating: number;
};

function MovieList() {
    const renderStars = (rating: number) => {
        const fullStars = "★".repeat(Math.floor(rating));
        const halfStar = rating % 1 >= 0.5 ? "⯪" : "";
        const emptyStars = "☆".repeat(5 - Math.ceil(rating));
        return fullStars + halfStar + emptyStars;
    };

    const averageRating = (reviews: Review[]) => {
        if (reviews.length === 0) return 0;
        const total = reviews.reduce((acc, review) => acc + review.rating, 0);
        return total / reviews.length;
    };

    return(
        <div className="movie-list">
            {movieList.info.map((item) => (
            <div className="movie-list-part">
                <MovieInfo
                    title={item.movie.title}
                    duration={item.movie.duration}
                    rating={item.movie.rating}
                    genre={item.movie.genre}
                    stars = {renderStars(averageRating(item.reviews))}
                    includeDescription = {false}
                    className="movie-info-list"
                    posterClass="poster-movielist"
                    textClass="movie-info-text"
                />
                <div className="voorstelling-info">
                    {item.voorstelingen.map((voorstelling) => (
                        <div className="voorstelling-card">
                            <div>zaal: {voorstelling.zaal.naam}</div>
                            <div>stoelen: {voorstelling.zaal.rijen * voorstelling.zaal.stoelen_per_rij}</div>
                            <div>start date: {formatDateForShowing(voorstelling.start_date)}</div>
                            <div>end date: {formatDateForShowing(voorstelling.end_date)}</div>
                        </div>
                    ))}
                </div>
                <Link
                    key={item.movie.title}
                    to={"/movie_detail"}
                    title={item.movie.title}
                    className="goto-button"
                    >
                        {"details"}
                </Link>
            </div>
            ))}
        </div>
    )
}

export default MovieList