import React, { useState } from "react";
import { hashCode } from "../../utils/image-hascode";
import MovieInfo from "../movie-detail/MovieInfo";
import "./show-panel.css";
import {fakeShows} from "./fake-data"

function Movie_panel() {
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

    const [selectedShow, setSelectedShow] = useState<ShowProp | null>(null);
    const [movie, setMovie] = useState<MovieProp | null>(null);
    const [zaal, setZaal] = useState<ZaalProp | null>(null);
    const [startDate, setStartDate] = useState<Date | string>("");
    const [endDate, setendDate] = useState<Date | string>("");

    const handleSave = () => {
        if (!movie || !zaal || !endDate || !startDate) {
            alert("Please enter all info.");
            return;
        }

        // Post to backend
        alert("Movie saved!");
    };

    const showChosen = (show: ShowProp | null) => {
        if (!show) {
            setMovie(null);
            setZaal(null);
            setStartDate('');
            setendDate('');
            return;
        }

        setMovie(show.movie);
        setZaal(show.zaal);
        setStartDate(show.start_date);
        setendDate(show.end_date);
    };

    return (
        <div className="movie-panel-container">
            <div className="movie-preview-side">
                <div className="top"><h1>Preview</h1></div>
                {movie != null && (
                    <MovieInfo
                        title={movie?.title}
                        duration={movie.duration as number}
                        rating={movie.rating}
                        genre={movie.genre}
                        includeDescription={true}
                        description={movie.description}
                        className="movie-info-preview"
                        posterClass="movie-preview-poster"
                        textClass="movie-preview-info"
                    />
                    )}

            </div>

            <div className="movie-form-side">
                <div className="form-top">
                    <h2>Add show Info</h2>


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
                        Delete Movie
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Movie_panel;
