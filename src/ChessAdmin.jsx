import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ChessAdmin() {
    const [chessData, setChessData] = useState([]);

    useEffect(() => {
        axios
            .get("https://chess.sulla.hu/chess")
            .then((response) => {
                setChessData(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Biztosan törölni szeretnéd?");
        if (confirmDelete) {
            axios
                .delete(`https://chess.sulla.hu/chess/${id}`)
                .then((response) => {
                    console.log(response);
                    setChessData(chessData.filter((data) => data.id !== id));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <>
            <h1>Sakkozók</h1>
            <div className="row">
                {chessData.map((data) => (
                    <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
                        <div className="card p-2" style={{ maxHeight: '400px', overflow: 'hidden' }}>
                            <img src={data.image_url} style={{ width: '100%', height: '200px', objectFit: 'cover' }}></img>
                            Név: {data.name}<br></br>
                            Szül. év: {data.birth_date}<br></br>
                            {data.world_ch_won < 1 ? "Nem volt világbajnok" : `${data.world_ch_won}x világbajnok`}
                            <button className="btn btn-warning">
                                Szerkesztés
                            </button>
                            <br></br>
                            <button className="btn btn-danger" onClick={() => handleDelete(data.id)}>
                                Törlés
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
