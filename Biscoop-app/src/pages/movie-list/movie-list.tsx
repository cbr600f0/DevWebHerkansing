import {fakeMovies} from "./fake-data"
import {Link} from "react-router-dom";
import "./movie-list.css"
import psychPoster from "../../images/Psych-the-Movie-poster.webp";

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
            {fakeMovies.info.map((item) => (
            <div className="movie-list-part">
                <div className="movie-info-list">
                    <img className="poster-movielist" src={psychPoster} alt={item.title}/>
                    <div className="movie-info-text">
                        <h1>{item.title}</h1>
                        <div><span className="label">Duration:</span> {item.duration}</div>
                        <div><span className="label">PG:</span> {item.rating}</div>
                        <div><span className="label">Genre:</span> {item.genre}</div>
                        <div><span className="label">Rating:</span> {renderStars(averageRating(item.reviews))}</div>
                    </div>
                </div>
                <Link
                    key={item.title}
                    to={"/movie_detail"}
                    title={item.title}
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