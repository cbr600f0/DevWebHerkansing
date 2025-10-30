import { useState } from "react";
import { formatDateForShowing } from "../../utils/date-fromatter";
import MovieInfo from "../movie-detail/MovieInfo";
import "./show-panel.css";
import { getAppData, deleteItem, addItem, updateItem} from "../../utils/storage";

function Show_panel() {
    const { fakeMovies, fakeShows, fakeZalen } = getAppData();
    interface ZaalProp {
        id: string;
        naam: string;
        rijen: number;
        stoelen_per_rij: number;
    }

    interface MovieProp {
        id: string;
        title: string;
        duration: number;
        rating: string;
        genre: string;
        description: string;
    }

    interface ShowProp {
        id: string;
        start_date: Date;
        end_date: Date;
        movieId: string;
        zaalId: string;
    }

    const [shows, setShows] = useState<ShowProp[]>(fakeShows);
    const [movies] = useState<MovieProp[]>(fakeMovies);
    const [rooms] = useState<ZaalProp[]>(fakeZalen);

    const [selectedShow, setSelectedShow] = useState<ShowProp | null>(null);
    const [selectedMovie, setSelectedMovie] = useState<MovieProp | null>(null);
    const [selectedzaal, setSelectedZaal] = useState<ZaalProp | null>(null);
    const [startDate, setStartDate] = useState<Date | string>("");
    const [endDate, setEndDate] = useState<Date | string>("");

    const handleSave = () => {
        if (!selectedMovie || !selectedzaal || !startDate || !endDate) {
            alert("Please enter all info.");
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            alert("Start date can't be after end date.");
            return;
        }

        const showEnd = new Date(start.getTime() + selectedMovie.duration * 60000);
        if (showEnd > end) {
            alert("Show isn't long enough.");
            return;
        }

        if (selectedShow) {
            selectedShow.movieId = selectedMovie.id;
            selectedShow.zaalId = selectedzaal.id;
            selectedShow.start_date = start;
            selectedShow.end_date = end;

            updateItem("fakeShows", selectedShow);
            alert("Show updated!");
        } else {
            // Add new show
            const newShow: ShowProp = {
                id: crypto.randomUUID(),
                movieId: selectedMovie.id,
                zaalId: selectedzaal.id,
                start_date: start,
                end_date: end,
            };
            addItem("fakeShows", newShow);
            alert("Show saved!");
        }

    };

    function formatDateForInput(date: Date | string): string {
        if (!date) return "";
        if (typeof date === "string") return date;
        const offset = date.getTimezoneOffset();
        const local = new Date(date.getTime() - offset * 60 * 1000);
        return local.toISOString().slice(0, 16);
    }

    const showChosen = (show: ShowProp | null) => {
        if (!show) {
            setSelectedMovie(null);
            setSelectedZaal(null);
            setStartDate('');
            setEndDate('');
            return;
        }

        setSelectedMovie(fakeMovies.find(m => m.id === show.movieId) ?? null);
        setSelectedZaal(fakeZalen.find(z => z.id === show.zaalId) ?? null);
        setStartDate(show.start_date);
        setEndDate(show.end_date);
    };

    return (
        <div className="movie-panel-container">
            <div className="movie-preview-side">
                <div className="top"><h1>Preview</h1></div>
                {selectedMovie != null && (
                    <MovieInfo
                        title={selectedMovie?.title}
                        duration={selectedMovie.duration as number}
                        rating={selectedMovie.rating}
                        genre={selectedMovie.genre}
                        includeDescription={true}
                        description={selectedMovie.description}
                        className="movie-info-preview"
                        posterClass="movie-preview-poster"
                        textClass="movie-preview-info"
                    />
                )}
                {selectedzaal != null &&
                    <div id="info">
                        <div>
                            <span className="label">Room name:</span> {selectedzaal?.naam}
                        </div>
                        <div>
                            <span className="label">Total Seats:</span> {selectedzaal?.stoelen_per_rij * selectedzaal.rijen}
                        </div>
                    </div>
                }
                {startDate != "" &&
                    <div id="info">
                        <div>
                            <span className="label">Start date:</span> {formatDateForShowing(startDate)}
                        </div>
                    </div>
                }
                {endDate != "" &&
                    <div id="info">
                        <div>
                            <span className="label">End date:</span> {formatDateForShowing(endDate)}
                        </div>
                    </div>
                }
            </div>

            <div className="movie-form-side">
                <div className="form-top">
                    <h2>Add show Info</h2>

                    <select
                        value={selectedMovie?.id || ""}
                        onChange={(e) => {
                            const movie = movies.find((m) => m.id === e.target.value) || null;
                            setSelectedMovie(movie);
                            setSelectedShow(null);
                        }}
                    >
                        <option value="">-- Pick a Movie --</option>
                        {movies.map((movie) => (
                            <option key={movie.id} value={movie.id}>
                                {movie.title}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedzaal?.id || ""}
                        onChange={(e) => {
                            const room = rooms.find((r) => r.id === e.target.value) || null;
                            setSelectedZaal(room);
                            setSelectedShow(null);
                        }}
                    >
                        <option value="">-- Pick a Room --</option>
                        {rooms.map((room) => (
                            <option key={room.id} value={room.id}>
                                {room.naam}
                            </option>
                        ))}
                    </select>

                    <div className="form-group">
                        <label>start date:</label>
                        <input
                            type="datetime-local"
                            value={formatDateForInput(startDate)}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>end date:</label>
                        <input
                            type="datetime-local"
                            value={formatDateForInput(endDate)}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>

                    <button onClick={handleSave} className="save-button">
                        {selectedShow ? "Update Show" : "Save Show"}
                    </button>
                </div>

                <div className="form-bottom">
                    <h3>Select a show</h3>
                    <select
                        value={selectedShow?.id || ""}
                        onChange={(e) => {
                            const show = shows.find((s) => s.id === e.target.value) || null;
                            setSelectedShow(show);
                            showChosen(show);
                        }}
                    >
                        <option value="">-- Pick a Show --</option>
                        {shows.map((show) => (
                            <option key={show.id} value={show.id}>
                                {fakeMovies.find(m => m.id === show.movieId)?.title ?? "N/A"} - {fakeZalen.find(z => z.id === show.zaalId)?.naam ?? "N/A"}
                            </option>
                        ))}
                    </select>

                    <button
                        className="delete-button"
                        onClick={() => {
                            if (!selectedShow) return;
                            const updatedShows = shows.filter(s => s.id !== selectedShow.id);
                            setShows(updatedShows);
                            showChosen(null);
                            deleteItem("fakeShows", selectedShow.id)
                        }}
                    >
                        Delete Show
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Show_panel;
