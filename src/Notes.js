// Notes.js
import React, { useState, useEffect } from "react";
import "./Notes.css";

const Notes = () => {
  const [notesContent, setNotesContent] = useState("");

  // Load notes content from local storage on component mount
  useEffect(() => {
    const storedNotesContent = localStorage.getItem("notesContent");
    if (storedNotesContent) {
      setNotesContent(storedNotesContent);
    }
  }, []);

  // Update local storage whenever notes content changes
  const handleNotesChange = (event) => {
    const newNotesContent = event.target.value;
    setNotesContent(newNotesContent);
    localStorage.setItem("notesContent", newNotesContent);
  };

  return (
    <div className="Notes">
      <div className="note-heading">
        <h2>Notes</h2>
        <small>
          This is a placeholder for your notes. You can add your notes here.
        </small>
      </div>
      <div className="bloc-note">
        <textarea
          className="block-text"
          value={notesContent}
          onChange={handleNotesChange}
        ></textarea>
      </div>
    </div>
  );
};

export default Notes;
