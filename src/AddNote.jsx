import { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { BASE_URL } from "./utils";

function AddNote({ onNoteAdded, editNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
    }
  }, [editNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editNote) {
        await axios.put(`${BASE_URL}/edit-notes/${editNote.id}`, { title, content });
      } else {
        await axios.post("${BASE_URL}/add-notes", { title, content });
      }
      setTitle("");
      setContent("");
      onNoteAdded();
    } catch (error) {
      console.error("Gagal menyimpan catatan:", error);
    }
  };

  return (
    <div className="container mt-5 is-flex is-justify-content-center">
      <div className="card has-background-light" style={{ maxWidth: "500px", width: "100%" }}>
        <header className="card-header">
          <p className="card-header-title has-text-dark">
            {editNote ? "Edit Catatan" : "Tambah Catatan Baru"}
          </p>
          <button className="button is-light is-small ml-3" onClick={onNoteAdded}>
            <FaArrowLeft /> Kembali
          </button>
        </header>

        <div className="card-content">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label has-text-dark">Judul Catatan</label>
              <div className="control">
                <input
                  className="input is-primary"
                  type="text"
                  placeholder="Masukkan judul catatan"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label has-text-dark">Isi Catatan</label>
              <div className="control">
                <textarea
                  className="textarea is-info"
                  placeholder="Tulis catatanmu di sini..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>

            <div className="field is-grouped is-justify-content-space-between">
              <button type="submit" className={`button ${editNote ? "is-warning" : "is-success"}`}>
                {editNote ? "Simpan Perubahan" : "Simpan Catatan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNote;
