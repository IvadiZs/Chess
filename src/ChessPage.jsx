import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ChessPage() {
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

    return (
        <>
            <h1>Sakkozók</h1>
            <div className="row">
                {chessData.map((data) => (
                    <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
                        <div className="card p-2" style={{ maxHeight: '300px', overflow: 'hidden' }}>
                            <img src={data.image_url} style={{ width: '100%', height: '200px', objectFit: 'cover' }}></img>
                            Név: {data.name}<br></br>
                            Szül. év: {data.birth_date}<br></br>
                            {data.world_ch_won < 1 ? "Nem volt világbajnok" : `${data.world_ch_won}x világbajnok`}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
