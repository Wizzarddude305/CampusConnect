import { use, useEffect, useState } from "react";
import '../styles/eventStyles.css';
import { EventCreationModal } from "./modal";
import { Bounce, toast, cssTransition } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
//Make all port mentions use the enviornment variable

interface MyComponentProps {
  isAdmin: boolean;
}



function EventList({isAdmin}: MyComponentProps){
    const [events , setEvents] = useState<any[]>([]);
    const [eventCreator, setEventCreator] = useState("");
    const [isEditing, setIsEditing] = useState(false)
    const [editingEventId, setEditingEventId] = useState<number | null>(null);
    const [isCreatingEvent, setIsCreatingEvent] = useState(false);

    const isEditor = isAdmin || eventCreator === "currentUser";

      
    const displayEvents = () =>{
            console.log("Redisplaying events")
            fetch("http://localhost:3000/api/get-events")
            .then((res) => res.json())
            .then((data) => {
              setEvents(data);
            })
            .catch((err) => console.error("EVENT ERROR:", err));
    }

    useEffect(() => {
      displayEvents()
    }, []);

    const notification = (success: Boolean, message : string) =>{
      if(success){
           toast.success(message, {
                    position : "top-right",
                    theme: "colored",
                    pauseOnHover: false
              })
        }else{
          toast.error(message, {
                    position : "top-right",
                    theme: "colored",
                    pauseOnHover: false
          })
        }

    }
    const handleEventCreation = (statusOk : Boolean, message : string) => {
        setIsCreatingEvent(false);
        notification(statusOk, message)
        displayEvents()
    }


    const deletingEvent = async(deletingEventId: number) =>{
        setIsEditing(true)
        const response = await fetch("http://localhost:3000/api/delete-event", {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ eventId: deletingEventId })
        })
      
        if (response.ok){
          const data = await response.json();
          notification(true, data.message)
          const updateEvents = events.filter((event) => event.id !== deletingEventId)
          console.log(deletingEventId)
          console.log(updateEvents)
          setEvents(updateEvents)
        } else {
          const error = await response.json().catch(() => null);
          console.error(`Delting Event Failed: , ${error} || ${response.status}`);
          notification(false, `Delting Event Failed ${response.status}`)
        }
      }

    return(
        <div>
            <div className = "event-header" style={{ }}>
                <h2 className="section-label" style={{margin: '0'}}>Upcoming Events</h2>
                {isAdmin && <button id="createEventButton" onClick={() => {console.log("creating event"); setIsCreatingEvent(true);}}>Create Event</button>}
            </div>
            {isCreatingEvent && <EventCreationModal onClose={() => setIsCreatingEvent(false)} onCreation={handleEventCreation} />}
            {events.length > 0 ? (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {events.map((event) => {
                  const formattedDate = event.date ? new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "TBA";
                  return (
                    <div>
                    {event.id === editingEventId ? (
                            <div key={event.id} style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9', minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
                                <p> currently editing event</p>
                            </div>
                        ) : (
                            <div key={event.id} style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9', minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
                                <h4 className="eventTitle">{event.title}</h4>
                                {formattedDate && <div><p><strong>Date:</strong> {formattedDate}</p></div>}
                                {event.time && <div><p><strong>Time:</strong> {event.time}</p></div>}
                                {event.location && <div><p><strong>Location:</strong> {event.location}</p></div>}
                                {event.description && <div><p style={{ flex: 1 }}> <strong>Description: </strong>{event.description}</p></div>}
                                {isEditor && <button style= {{ marginTop: 'auto' }} onClick={() => setEditingEventId(event.id)}>Edit Event</button>}
                                {isEditor && <button style={{ marginTop: 'auto' }} onClick={() => {deletingEvent(event.id)}}>Delete Event</button>}
                                <button style={{ marginTop: 'auto' }}>Sign up</button>
                            </div>
                        )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p>
              Events will appear here once the backend, database,
              and event creation features are implemented.
            </p>
          )}
        </div>
    )
}

export default EventList;
