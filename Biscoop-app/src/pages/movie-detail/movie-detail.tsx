import "./movie-detail.css";
import ReviewList from "./ReviewList";
import ShowtimeSelector from "./ShowSelector";
import MovieInfo from "./MovieInfo";
import { fakeMovies, fakeReviews} from "../../utils/fake-data"
import { useParams } from "react-router-dom";


function Movie_detail() {
    const { movieId } = useParams();
    const showtimes = [
        { time: "1430", room: "Theater 5", total: 120, available: 84 },
        { time: "1700", room: "Theater 2", total: 150, available: 112 },
        { time: "1930", room: "Theater 3", total: 200, available: 90 },
        { time: "2215", room: "Theater 1", total: 100, available: 47 }
    ];
    const movie = fakeMovies.find((m) => m.id === movieId) ?? fakeMovies[0];

return(
    <div className="container">

        <div className="room-info">
            <h2>Room & Showtime Information</h2>

            <div>
                <ShowtimeSelector showtimes={showtimes} />
            </div>
        </div>

        <div>
            <MovieInfo
                title={movie.title}
                duration={movie.duration}
                rating={movie.rating}
                genre={movie.genre}
                includeDescription = {true}
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