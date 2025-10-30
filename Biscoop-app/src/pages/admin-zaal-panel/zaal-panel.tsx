import { useState } from "react";
import { getAppData, deleteItem, addItem, updateItem } from "../../utils/storage";
import "./zaal-panel.css";

function Zaal_panel() {
    interface ZaalProp {
        id: string;
        naam: string;
        rijen: number;
        stoelen_per_rij: number;
    }
    const { fakeZalen } = getAppData();
    const [zalen, setZalen] = useState<ZaalProp[]>(fakeZalen);

    const [naam, setNaam] = useState("");
    const [rijen, setRijen] = useState<number | string>("");
    const [stoelenPerRij, setStoelenPerRij] = useState<number | string>("");
    const [selectedZaal, setSelectedZaal] = useState<ZaalProp | null>(null);


    const handleSave = () => {
        if (!naam || rijen === "" || stoelenPerRij === "") {
            alert("Please enter all info.");
            return;
        }

        const rijenNum = Number(rijen);
        const stoelenNum = Number(stoelenPerRij);

        if (selectedZaal) {
            selectedZaal.naam = naam;
            selectedZaal.rijen = rijenNum;
            selectedZaal.stoelen_per_rij = stoelenNum;

            updateItem("fakeZalen", selectedZaal);
            alert("Zaal updated!");
        } else {
            const newZaal: ZaalProp = {
                id: crypto.randomUUID(),
                naam,
                rijen: rijenNum,
                stoelen_per_rij: stoelenNum,
            };
            addItem("fakeZalen", newZaal);
            alert("Zaal saved!");
        }

    }

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
                            onChange={(e) => setRijen(e.target.value)}
                            placeholder="Enter amount of rows"
                            min={0}
                        />
                    </div>

                    <div className="form-group">
                        <label>Seats per row:</label>
                        <input
                            type="number"
                            value={rijen}
                            onChange={(e) => setStoelenPerRij(e.target.value)}
                            placeholder="Enter amount seats per row"
                            min={0}
                        />
                    </div>

                    <button onClick={handleSave} className="save-button">
                        {selectedZaal ? "Update Room" : "Save Room"}
                    </button>
                </div>

                <div className="form-bottom">
                    <h3>Select a Room</h3>
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
                            deleteItem("fakeZalen", selectedZaal.id)
                        }}
                    >
                        Delete Room
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Zaal_panel;
