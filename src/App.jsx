import { useState } from "react";
import NotesList from "./NotesList";
import AddNote from "./AddNote";
import axios from "axios";
import { BASE_URL } from "./utils";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editNote, setEditNote] = useState(null);

  const handleNoteAdded = () => {
    setRefresh(!refresh);
    setShowForm(false);
    setEditNote(null); 
  };

  const handleCreateNote = () => {
    setShowForm(true);
    setEditNote(null);
  };

  const handleEditNote = (note) => {
    setShowForm(true);
    setEditNote(note); 
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus catatan ini?")) {
      try {
        await axios.delete(`${BASE_URL}/delete-notes/${id}`);
        handleNoteAdded();
      } catch (error) {
        console.error("Gagal menghapus catatan:", error);
      }
    }
  };

  return (
    <section className="section">
      <div className="container">
        {showForm ? (
          <AddNote onNoteAdded={handleNoteAdded} editNote={editNote} />
        ) : (
          <NotesList key={refresh} onCreate={handleCreateNote} onEdit={handleEditNote} onDelete={handleDeleteNote} />
        )}
      </div>
    </section>
  );
}

export default App;
