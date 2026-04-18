import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import '../styles/modal.css';

interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
}

export const EventEditModal = ({ event, onClose, onSave }: { event: Event; onClose: () => void; onSave: (statusOk: boolean, message: string) => void }) => {
    const [title, setTitle] = useState(event.title || '');
    const [date, setDate] = useState(event.date ? event.date.split('T')[0] : '');
    const [time, setTime] = useState(event.time || '');
    const [location, setLocation] = useState(event.location || '');
    const [description, setDescription] = useState(event.description || '');

    useEffect(() => {
        setTitle(event.title || '');
        setDate(event.date ? event.date.split('T')[0] : '');
        setTime(event.time || '');
        setLocation(event.location || '');
        setDescription(event.description || '');
    }, [event]);

    const saveChanges = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/update-event', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventId: event.id, title, date, time, location, description }),
            });
            if (response.ok) {
                const data = await response.json();
                onSave(true, data.message);
            } else {
                const error = await response.json().catch(() => null);
                console.error('Event update failed', error || response.status);
                onSave(false, error?.message || 'Failed to update event');
            }
        } catch (err) {
            console.error('Network error updating event:', err);
            onSave(false, 'Network error — could not save changes');
        }
    };

    return createPortal(
        <>
            <div className="overlay" onClick={onClose} />
            <div className="modal-content">
                <span className="close-modal" onClick={onClose}>&times;</span>
                <h3>Edit Event</h3>

                <div className="modal-edits-row">
                    <p>Title</p>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="modal-edits-row">
                    <p>Date</p>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="modal-edits-row">
                    <p>Time</p>
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
                <div className="modal-edits-row">
                    <p>Location</p>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div className="modal-edits-column">
                    <p>Description</p>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className="modal-actions">
                    <button className="modal-btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="modal-btn-primary" onClick={saveChanges}>Save Changes</button>
                </div>
            </div>
        </>,
        document.body
    );
};

export const EventCreationModal = ({ onClose, onCreation }: { onClose: () => void; onCreation: (statusOk: Boolean, message: string) => void }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(Date);
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');

    const createEvent = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/create-event', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, date, time, location, description }),
            });

            if (response.ok) {
                const data = await response.json();
                onCreation(response.ok, data.message);
            } else {
                const error = await response.json().catch(() => null);
                console.error('Event creation failed', error || response.status);
                onCreation(false, error?.message || 'Failed to create event');
            }
        } catch (err) {
            console.error('Network error creating event:', err);
            onCreation(false, 'Network error — could not create event');
        }
    };

    return createPortal(
        <>
            <div className="overlay" onClick={onClose} />
            <div className="modal-content">
                <span className="close-modal" onClick={onClose}>&times;</span>
                <h3>Create New Event</h3>

                <div className="modal-edits-row">
                    <p>Title</p>
                    <input type="text" placeholder="Event title" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="modal-edits-row">
                    <p>Date</p>
                    <input type="date" onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="modal-edits-row">
                    <p>Time</p>
                    <input type="time" onChange={(e) => setTime(e.target.value)} />
                </div>
                <div className="modal-edits-row">
                    <p>Location</p>
                    <input type="text" placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div className="modal-edits-column">
                    <p>Description</p>
                    <textarea placeholder="Describe the event..." onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className="modal-actions">
                    <button className="modal-btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="modal-btn-primary" onClick={createEvent}>Create Event</button>
                </div>
            </div>
        </>,
        document.body
    );
};
