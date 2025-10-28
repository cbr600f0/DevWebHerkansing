import "./movie-detail.css";
import ReviewList from "./ReviewList";
import ShowtimeSelector from "./ShowSelector";
import MovieInfo from "./MovieInfo";

function Movie_detail() {

    const showtimes = [
        { time: "1430", room: "Theater 5", total: 120, available: 84 },
        { time: "1700", room: "Theater 2", total: 150, available: 112 },
        { time: "1930", room: "Theater 3", total: 200, available: 90 },
        { time: "2215", room: "Theater 1", total: 100, available: 47 }
    ];

    const reviews = [
        {
            name: "Gee buternaps",
            text: "Fun to watch, I recommend a pineapple as snack.",
            rating: 4,
        },
        {
            name: "Shawn",
            text: "Just because you put syrup on something doesn't make it pancakes.",
            rating: 5,
        },
        {
            name: "Gurton buster",
            text: "Perfect blend of comedy and mystery, exactly what I expected.",
            rating: 5,
        },
    ];

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
                title="Psych: The Movie"
                duration={88}
                rating="PG-13"
                genre="Comedy, Mystery"
                includeDescription = {true}
                description="A comedic thriller and a continuation of the TV series, following Shawn Spencer and Burton Guster as they investigate an attack on Juliet O'Hara's partner, Samuel, which results in the theft of a device giving access to the San Francisco Police Department database."
                className="movie-info"
                posterClass="poster"
                textClass="info"
            />
        </div>

        <div className="reviews">
            <h2>Reviews</h2>
            <ReviewList reviews={reviews} />
        </div>
    </div>    
    )
}

export default Movie_detail