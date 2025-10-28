import { useState } from "react";
import { formatDateForShowing } from "../../utils/date-fromatter";
import MovieInfo from "../movie-detail/MovieInfo";
import "./show-panel.css";
import { fakeShows } from "../../utils/fake-data"
import { fakeMovies } from "../../utils/fake-data"
import { fakeZalen } from "../../utils/fake-data"

function Show_panel() {
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
        movie: MovieProp;
        zaal: ZaalProp;
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
        if (!selectedMovie || !selectedzaal || !endDate || !startDate) {
            alert("Please enter all info.");
            return;
        }
        if (new Date(startDate) > new Date(endDate)) {
            alert("Start date can't be after end date.");
            return;
        }
        if (new Date(addMinutes(startDate, selectedMovie.duration)) > new Date(endDate)) {
            alert("Show isn't long enough.");
            return;
        }

        // Post to backend
        alert("show saved!");
    };

    function formatDateForInput(date: Date | string): string {
        if (!date) return "";
        if (typeof date === "string") return date;
        const offset = date.getTimezoneOffset();
        const local = new Date(date.getTime() - offset * 60 * 1000);
        return local.toISOString().slice(0, 16);
    }

    function addMinutes(date: Date | string, minutes: number): Date {
        const base = typeof date === "string" ? new Date(date) : date;
        return new Date(base.getTime() + minutes * 60000);
    }

    const showChosen = (show: ShowProp | null) => {
        if (!show) {
            setSelectedMovie(null);
            setSelectedZaal(null);
            setStartDate('');
            setEndDate('');
            return;
        }

        setSelectedMovie(show.movie);
        setSelectedZaal(show.zaal);
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
                {selectedzaal!= null &&
                    <div id="info">
                        <div>
                            <span className="label">Room name:</span> {selectedzaal?.naam}
                        </div>
                        <div>
                            <span className="label">Total Seats:</span> {selectedzaal?.stoelen_per_rij * selectedzaal.rijen}
                        </div>
                    </div>
                }
                {startDate!= "" &&
                    <div id="info">
                        <div>
                            <span className="label">Start date:</span> {formatDateForShowing(startDate)}
                        </div>
                    </div>
                }
                {endDate!= "" &&
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
                        Save show
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
                                {show.movie.title} - {show.zaal.naam}
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
                            // uiteindelijk delete naar backend
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
