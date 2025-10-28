import React, { useState } from "react";
import { hashCode } from "../../utils/image-hascode";
import MovieInfo from "../movie-detail/MovieInfo";
import "./zaal-panel.css";

function Zaal_panel() {
    interface ZaalProp {
        id: string;
        naam: string;
        rijen: number;
        stoelen_per_rij: number;
    }

    const [zalen, setZalen] = useState<ZaalProp[]>([
        { id: "zaal-1", naam: "Zaal 1 - Grote Zaal", rijen: 15, stoelen_per_rij: 20 },
        { id: "zaal-2", naam: "Zaal 2 - Middenzaal", rijen: 10, stoelen_per_rij: 15 },
        { id: "zaal-3", naam: "Zaal 3 - Kleine Zaal", rijen: 8, stoelen_per_rij: 12 },
        { id: "zaal-4", naam: "Zaal 4 - VIP Lounge", rijen: 5, stoelen_per_rij: 10 },
        { id: "zaal-5", naam: "Zaal 5 - IMAX", rijen: 20, stoelen_per_rij: 25 },
    ]);

    const [naam, setNaam] = useState("");
    const [rijen, setRijen] = useState<number | string>("");
    const [stoelenPerRij, setStoelenPerRij] = useState<number | string>("");
    const [selectedZaal, setSelectedZaal] = useState<ZaalProp | null>(null);


    const handleSave = () => {
        if (!naam || !rijen || !stoelenPerRij) {
            alert("Please enter all info.");
            return;
        }

        // Post to backend
        alert("Zaal saved!");
    };

    const zaalChosen = (zaal: ZaalProp | null) => {
        if (!zaal) {
            setNaam("")
            setRijen("")
            setStoelenPerRij("")
            return;
        }

        setNaam(zaal.naam)
        setRijen(zaal.rijen)
        setStoelenPerRij(zaal.stoelen_per_rij)
    };

    return (
        <div className="movie-panel-container">
            <div className="movie-preview-side">
                <div className="top"><h1>Preview</h1></div>
                {/* {(
                    <MovieInfo
                        poster={poster}
                        title={title}
                        duration={duration}
                        rating={rating}
                        genre={genre}
                        includeDescription={true}
                        description={description}
                        className="movie-info-preview"
                        posterClass="movie-preview-poster"
                        textClass="movie-preview-info"
                    />
                )} */}
            </div>

            <div className="movie-form-side">
                <div className="form-top">
                    <h2>Add Movie Info</h2>

                    <div className="form-group">
                        <label>Room name:</label>
                        <input
                            type="text"
                            value={naam}
                            onChange={(e) => setNaam(e.target.value)}
                            placeholder="Enter room name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Rows:</label>
                        <input
                            type="number"
                            value={rijen}
                            onChange={(e) => setRijen(e.target.value as unknown as number)}
                            placeholder="Enter amount of rows"
                            min={0}
                        />
                    </div>

                    <div className="form-group">
                        <label>Seats per row:</label>
                        <input
                            type="number"
                            value={rijen}
                            onChange={(e) => setStoelenPerRij(e.target.value as unknown as number)}
                            placeholder="Enter amount seats per row"
                            min={0}
                        />
                    </div>

                    <button onClick={handleSave} className="save-button">
                        Save Room
                    </button>
                </div>

                <div className="form-bottom">
                    <h3>Select a rRoom</h3>
                    <select
                        value={selectedZaal?.id || ""}
                        onChange={(e) => {
                            const zaal = zalen.find((z) => z.id === e.target.value) || null;
                            setSelectedZaal(zaal);
                            zaalChosen(zaal);
                        }}
                    >
                        <option value="">-- Pick a Room --</option>
                        {zalen.map((zaal) => (
                            <option key={zaal.id} value={zaal.id}>
                                {zaal.naam}
                            </option>
                        ))}
                    </select>
                    <button
                        className="delete-button"
                        onClick={() => {
                            if (!selectedZaal) return;
                            const updatedZalen = zalen.filter(z => z.id !== selectedZaal.id);
                            setZalen(updatedZalen);
                            setSelectedZaal(null);
                            zaalChosen(null);
                        }}
                    >
                        Delete Movie
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Zaal_panel;
