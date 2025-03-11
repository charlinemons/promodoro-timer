import React, { useState, useEffect } from "react";
import { GoPlus } from "react-icons/go";
import { GoX } from "react-icons/go";
import "./Notes.css";

const colors = ["#f4f3ee", "#f4f3ee", "#f4f3ee", "#f4f3ee"]; // Pastel sticky note colors

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("stickyNotes")) || [];
    setNotes(storedNotes);
  }, []);

  const updateLocalStorage = (updatedNotes) => {
    localStorage.setItem("stickyNotes", JSON.stringify(updatedNotes));
  };

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "New Note",
      content: "",
      color: colors[notes.length % colors.length],
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    updateLocalStorage(updatedNotes);
  };

  const updateNote = (id, key, value) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, [key]: value } : note
    );
    setNotes(updatedNotes);
    updateLocalStorage(updatedNotes);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    updateLocalStorage(updatedNotes);
  };

  return (
    <div className="Notes">
      <h2>Sticky Wall</h2>
      <div className="sticky-wall">
        {notes.map((note) => (
          <div
            key={note.id}
            className="sticky-note"
            style={{ backgroundColor: note.color }}
          >
            {/* <input
              type="text"
              className="note-title"
              value={note.title}
              onChange={(e) => updateNote(note.id, "title", e.target.value)}
            /> */}
            <textarea
              className="note-text"
              value={note.content}
              onChange={(e) => updateNote(note.id, "content", e.target.value)}
            />
            <button
              className="delete-button"
              onClick={() => deleteNote(note.id)}
            >
              <GoX />
            </button>
          </div>
        ))}
        <div className="add-note" onClick={addNote}>
          <GoPlus size={30} />
        </div>
      </div>
    </div>
  );
};

export default Notes;
