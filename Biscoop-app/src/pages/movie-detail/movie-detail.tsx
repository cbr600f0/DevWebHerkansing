import "./movie-detail.css";
import ReviewList from "./ReviewList";
import MovieInfo from "./MovieInfo";
import ShowInfo from "../movie-list/showInfo";
import { getAppData } from "../../utils/storage";
import { useParams } from "react-router-dom";


function Movie_detail() {
    const { movieId } = useParams();
    const { fakeMovies, fakeReviews} = getAppData();
    const movie = fakeMovies.find((m) => m.id === movieId) ?? fakeMovies[0];

    return (
        <div className="container">

            <div className="room-info">
                <h2>Room & Showtime Information</h2>
                <ShowInfo movieId={movie.id} button={true} />
            </div>

            <div>
                <MovieInfo
                    title={movie.title}
                    duration={movie.duration}
                    rating={movie.rating}
                    genre={movie.genre}
                    includeDescription={true}
                    description={movie.description}
                    className="movie-info"
                    posterClass="poster"
                    textClass="info"
                />
            </div>

            <div className="reviews">
                <h2>Reviews</h2>
                <ReviewList reviews={fakeReviews.filter(r => r.movieId === movieId)} />
            </div>
        </div>
    )
}

export default Movie_detail