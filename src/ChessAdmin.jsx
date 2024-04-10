import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ChessAdmin() {
    const [chessData, setChessData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", birth_date: "", world_ch_won: "", image_url: "" });

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

    const handleAdd = () => {
        axios
            .post("https://chess.sulla.hu/chess", formData)
            .then((response) => {
                console.log(response);
                setChessData([...chessData, response.data]);
                setModalOpen(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <h1 style={{ display: 'inline-block' }}>Admin felület</h1>
            <button className="btn btn-success" style={{ float: 'right', marginTop: '10px' }} onClick={() => setModalOpen(true)}>
                Hozzáadás
            </button>
            {modalOpen && (
                <div>
                    <h2>Új sakkozó felvétele</h2>
                    <input type="text" placeholder="Név:" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    <input type="text" placeholder="Születési ideje:" value={formData.birth_date} onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })} />
                    <input type="number" placeholder="Világbajnoki címek" value={formData.world_ch_won} onChange={(e) => setFormData({ ...formData, world_ch_won: e.target.value })} />
                    <input type="text" placeholder="Kép URL" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} />
                    <button className="btn btn-success" onClick={handleAdd} style={{
                        float: 'right',
                    }}>Hozzáadás</button>
                    <button className="btn btn-danger" onClick={() => setModalOpen(false)} style={{
                        float: 'right',
                        marginRight: '10px'
                    }}>Mégse</button>
                </div>
            )}
            <br></br>
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
