import React, { useState, useEffect } from "react";
import { GoPlus, GoX } from "react-icons/go";
import "./Calendar.css";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [eventDetails, setEventDetails] = useState({
    title: "",
    date: "",
    time: "",
    address: "",
    info: "",
  });

  useEffect(() => {
    const storedEvents =
      JSON.parse(localStorage.getItem("calendarEvents")) || [];
    setEvents(sortEvents(storedEvents));
  }, []);

  const updateLocalStorage = (updatedEvents) => {
    localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
  };

  const parseEventDate = (event) => {
    const { date, time } = event;
    if (!date || !time) return new Date();
    const fullDateString = `${date} ${new Date().getFullYear()} ${time}`;
    const parsedDate = new Date(fullDateString);
    return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
  };

  const sortEvents = (eventsArray) => {
    return [...eventsArray].sort(
      (a, b) => parseEventDate(a) - parseEventDate(b)
    );
  };

  const openModal = () => {
    if (!newEventTitle.trim()) {
      alert("Please enter an event title.");
      return;
    }
    setEventDetails({
      title: newEventTitle,
      date: "",
      time: "",
      address: "",
      info: "",
    });
    setShowModal(true);
    setNewEventTitle(""); // Clear the input after opening the modal
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addEventDetails = () => {
    const { title, date, time, address, info } = eventDetails;
    if (!date.trim()) {
      alert("Please enter a valid date.");
      return;
    }

    // On peut ne pas avoir d'heure, d'adresse ou d'info, ils sont optionnels
    const updatedEvent = {
      title,
      date,
      time: time || "TBD",
      address: address || "TBD",
      info: info || "No additional info",
    };

    const updatedEvents = sortEvents([...events, updatedEvent]); // Ajoute l'événement et trie
    setEvents(updatedEvents); // Mets à jour l'état
    updateLocalStorage(updatedEvents); // Mets à jour localStorage
    setShowModal(false); // Ferme la modale
    setEventDetails({
      title: "",
      date: "",
      time: "",
      address: "",
      info: "",
    }); // Réinitialise les détails de l'événement
  };

  const deleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
    updateLocalStorage(updatedEvents);
  };

  const getMessage = () => {
    return events.length === 0
      ? "You have no appointments."
      : `You have ${events.length} appointment(s) to come.`;
  };

  return (
    <div className="calendar">
      <h2>Calendar</h2>
      <small>{getMessage()}</small>
      <div className="event-form">
        <input
          type="text"
          placeholder="Enter event title"
          value={newEventTitle}
          onChange={(e) => setNewEventTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              openModal();
            }
          }}
        />

        <button
          className="add-event"
          onClick={openModal}
          disabled={!newEventTitle.trim()} // Disable button if no title
        >
          <GoPlus size={20} />
        </button>
      </div>

      <ul className="event-list">
        {events.map((event, index) => {
          // Formatage de la date (ex: 23 March)
          const eventDate = new Date(event.date);
          const formattedDate = eventDate.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
          });

          return (
            <li key={index} className="event-item">
              <div className="day-info">
                <div className="main-info">
                  <strong>{event.title}</strong> - {formattedDate} -{" "}
                  {event.time || "TBD"}
                </div>
                <button
                  className="delete-event"
                  onClick={() => deleteEvent(index)}
                >
                  <GoX />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Details for "{eventDetails.title}"</h3>

            {/* Date Picker */}
            <input
              type="date"
              value={eventDetails.date}
              onChange={(e) =>
                setEventDetails({ ...eventDetails, date: e.target.value })
              }
              required
            />

            {/* Time Picker (optional) */}
            <input
              type="time"
              value={eventDetails.time}
              onChange={(e) =>
                setEventDetails({ ...eventDetails, time: e.target.value })
              }
            />

            {/* Address (optional) */}
            <input
              type="text"
              placeholder="Event address (e.g., 123 Main St)"
              value={eventDetails.address}
              onChange={(e) =>
                setEventDetails({ ...eventDetails, address: e.target.value })
              }
            />

            {/* Additional Info (optional) */}
            <textarea
              placeholder="Additional information (optional)"
              value={eventDetails.info}
              onChange={(e) =>
                setEventDetails({ ...eventDetails, info: e.target.value })
              }
            />

            <button className="save-event" onClick={addEventDetails}>
              Save Event
            </button>
            <button className="close-modal" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
