import React, { useState } from "react";
// import { hashCode } from "../../utils/image-hascode";
import { getAppData, deleteItem, addItem, updateItem } from "../../utils/storage";
import MovieInfo from "../movie-detail/MovieInfo";
import "./movie-panel.css";

function Movie_panel() {
    const { fakeMovies } = getAppData();
    interface MovieProp {
        id: string;
        title: string;
        duration: number;
        rating: string;
        genre: string;
        description: string;
    }

    const [movies, setMovies] = useState<MovieProp[]>(fakeMovies);


    const [title, setTitle] = useState("");
    const [rating, setRating] = useState("");
    const [genre, setGenre] = useState("");
    const [duration, setDuration] = useState<number | string>("");
    const [description, setDescription] = useState("");
    const [selectedMovie, setSelectedMovie] = useState<MovieProp | null>(null);
    const [poster, setPoster] = useState<string | undefined>(undefined);

    const handlePosterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPoster(URL.createObjectURL(file));
        }
    };

    const handleSave = () => {
        if (!title || !description || !rating) {
            alert("Please enter all info.");
            return;
        }

        if (selectedMovie) {
            selectedMovie.title = title;
            selectedMovie.description = description;
            selectedMovie.rating = rating;
            selectedMovie.genre = genre;
            selectedMovie.duration = duration as number;
            updateItem("fakeMovies", selectedMovie);
            alert("Movie updated!");
        } else {
            const newMovie: MovieProp = {
                id: crypto.randomUUID(),
                title,
                description,
                rating,
                genre,
                duration: duration as number,
            };
            addItem("fakeMovies", newMovie);
            alert("Movie saved!");
        }

    };

    const movieChosen = (movie: MovieProp | null) => {
        if (!movie) {
            setDescription('');
            setDuration('');
            setTitle('');
            setGenre('');
            setRating('');
            return;
        }

        setDescription(movie.description);
        setDuration(movie.duration.toString());
        setTitle(movie.title);
        setGenre(movie.genre);
        setRating(movie.rating);
    };

    return (
        <div className="movie-panel-container">
            <div className="movie-preview-side">
                <div className="top"><h1>Preview</h1></div>
                {(
                    <MovieInfo
                        poster={poster}
                        title={title}
                        duration={duration as number}
                        rating={rating}
                        genre={genre}
                        includeDescription={true}
                        description={description}
                        className="movie-info-preview"
                        posterClass="movie-preview-poster"
                        textClass="movie-preview-info"
                    />
                )}
            </div>

            <div className="movie-form-side">
                <div className="form-top">
                    <h2>Add Movie Info</h2>

                    <div className="form-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter movie title"
                        />
                    </div>

                    <div className="form-group">
                        <label>Duration (minutes):</label>
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="Enter duration in minutes"
                            min={0}
                        />
                    </div>

                    <div className="form-group">
                        <label>PG Rating:</label>
                        <select
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        >
                            <option value="">Select rating</option>
                            <option value="G">G</option>
                            <option value="PG">PG</option>
                            <option value="PG-13">PG-13</option>
                            <option value="R">R</option>
                            <option value="NC-17">NC-17</option>
                            <option value="NR">NR</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Genre:</label>
                        <input
                            type="text"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            placeholder="e.g. Comedy, Mystery"
                        />
                    </div>

                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter movie description"
                        />
                    </div>

                    <div className="form-group">
                        <label>Poster Image:</label>
                        <input type="file" accept="image/*" onChange={handlePosterUpload} />
                    </div>

                    <button onClick={handleSave} className="save-button">
                        {selectedMovie ? "Update Movie" : "Save Movie"}
                    </button>
                </div>

                <div className="form-bottom">
                    <h3>Select a Movie</h3>
                    <select
                        value={selectedMovie?.id || ""}
                        onChange={(e) => {
                            const movie = movies.find((m) => m.id === e.target.value) || null;
                            setSelectedMovie(movie);
                            movieChosen(movie);
                        }}
                    >
                        <option value="">-- Pick a Movie --</option>
                        {movies.map((movie) => (
                            <option key={movie.id} value={movie.id}>
                                {movie.title}
                            </option>
                        ))}
                    </select>
                    <button
                        className="delete-button"
                        onClick={() => {
                            if (!selectedMovie) return;
                            const updatedMovies = movies.filter(m => m.id !== selectedMovie.id);
                            setMovies(updatedMovies);
                            setSelectedMovie(null);
                            movieChosen(null);
                            deleteItem("fakeMovies", selectedMovie.id);

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
