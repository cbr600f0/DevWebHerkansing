import { getAppData } from "../../utils/storage";
import { formatDateForShowing } from "../../utils/date-fromatter";
import { Link } from "react-router-dom";
import "./movie-list.css"
import MovieInfo from "../movie-detail/MovieInfo";

type Review = {
    name: string;
    text: string;
    rating: number;
};

function MovieList() {
    const { fakeMovies, fakeReviews, fakeShows, fakeZalen } = getAppData();
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

    return (
        <div className="movie-list">
            {fakeMovies.map((item) => (
                <div className="movie-list-part">
                    <MovieInfo
                        title={item.title ?? "N/A"}
                        duration={item.duration ?? 0}
                        rating={item.rating ?? "N/A"}
                        genre={item.genre ?? "N/A"}
                        stars={renderStars(averageRating(fakeReviews.filter(r => r.movieId === item.id)))}
                        includeDescription={false}
                        className="movie-info-list"
                        posterClass="poster-movielist"
                        textClass="movie-info-text"
                    />
                    <div className="voorstelling-info">
                        {fakeShows.filter(s => s.movieId == item.id).map((voorstelling) => (
                            <div className="voorstelling-card">
                                <div>zaal: {fakeZalen.find(z => z.id === voorstelling.zaalId)?.naam ?? "N/A"}</div>
                                <div>
                                    Stoelen: {(fakeZalen.find(z => z.id === voorstelling.zaalId)?.rijen ?? 0) *
                                        (fakeZalen.find(z => z.id === voorstelling.zaalId)?.stoelen_per_rij ?? 0)}
                                </div>
                                <div>start date: {formatDateForShowing(voorstelling.start_date)}</div>
                                <div>end date: {formatDateForShowing(voorstelling.end_date)}</div>
                            </div>
                        ))}
                    </div>
                    <Link
                        key={item.id ?? "N/A"}
                        to={`/movie_detail/${item.id ?? ""}`}
                        title={item.id ?? "N/A"}
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