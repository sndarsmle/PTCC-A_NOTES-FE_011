import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; 
import { BASE_URL } from "./utils";

function NotesList({ onCreate, onEdit, onDelete }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notes`);
      setNotes(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="is-flex is-flex-direction-column is-align-items-center mb-5">
        <h1 className="title is-2 has-text-dark">AKSARA APP.</h1>
        <h4 className="subtitle is-6 has-text-grey">
          Ikat hasil buruanmu dengan tali, ikat ilmumu dengan tulisan
        </h4>
      </div>

      <div className="is-flex is-justify-content-end mb-5">
        <button className="button is-primary" onClick={onCreate}>
          ➕ Buat Catatan
        </button>
      </div>

      
      <div className="columns is-multiline">
        {notes.length === 0 ? (
          <p className="has-text-centered has-text-dark">Belum ada catatan.</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="column is-one-third">
              <div className="card has-background-light">
                <header className="card-header">
                  <p className="card-header-title has-text-dark">{note.title}</p>
                  <div className="card-header-icon">
                    <button
                      className="button is-white is-small has-text-warning"
                      onClick={() => onEdit(note)}
                      title="Edit Catatan"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="button is-white is-small has-text-danger"
                      onClick={() => onDelete(note.id)}
                      title="Hapus Catatan"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </header>
                <div className="card-content has-text-dark">
                  <div className="content">{note.content}</div>
                  <p className="has-text-grey mt-3">
                    🕒 Dibuat: {new Date(note.date_created).toLocaleDateString()} | 🔄 Diperbarui: {new Date(note.date_updated).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotesList;
