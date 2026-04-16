
import {useState}from 'react';
import {toast} from 'react-toastify'
import '../styles/modal.css';

export const EventCreationModal = ({onClose, onCreation}: {onClose: () => void, onCreation: (statusOk : Boolean , message: string ) => void}) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(Date);
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');

    const createEvent = async () => {
       const response = await fetch('http://localhost:3001/api/create-event', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title, date, time, location, description})
       })
       
        if (response.ok){
          const data = await response.json();
          onCreation(response.ok, data.message)
        } else {
          const error = await response.json().catch(() => null);
          console.error('Login failed', error || response.status);
          onCreation(false, error.message)
        }
     
    }

    return(
    <div className="overlay">
        <div id="createEventModal" className="modal">
            <div className="modal-content">
                <span className="close-modal" onClick={onClose}>&times;</span>
                <div className="modal-edits-row"><p className="event-descriptor" style={{margin: 0}}>Event Title:</p> <input style={{margin: 0}} type="text" onChange={(e) => setTitle(e.target.value)}></input></div>
                <div className="modal-edits-row"><p className="event-descriptor" style={{margin: 0}}>Event Date:</p> <input style={{margin: 0}} type="date" onChange={(e) => setDate(e.target.value)}></input></div>
                <div className="modal-edits-row"><p className="event-descriptor" style={{margin: 0}}>Event Time:</p> <input style={{margin: 0}} type="time" onChange={(e) => setTime(e.target.value)}></input></div>
                <div className="modal-edits-row"><p className="event-descriptor" style={{margin: 0}}>Event Location:</p> <input style={{margin: 0}} type="text" onChange={(e) => setLocation(e.target.value)}></input></div>
                <div className="modal-edits-column"><p className="event-descriptor" >Event Description:</p> <textarea onChange={(e) => setDescription(e.target.value)}></textarea></div>
                <button style={{alignSelf: 'flex-end'}} onClick={createEvent}>Create Event</button>
            </div>
        </div>
    </div>)
}


