import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/eventStyles.css';
import { EventCreationModal, EventEditModal } from "./modal";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "./AuthContext";

interface MyComponentProps {
  isAdmin: boolean;
  searchQuery: string;
  filterRange: string;
}

function EventList({ isAdmin, searchQuery, filterRange }: MyComponentProps){
    const [events , setEvents] = useState<any[]>([]);
    const [editingEvent, setEditingEvent] = useState<any | null>(null);
    const [isCreatingEvent, setIsCreatingEvent] = useState(false);
    const [myRsvps, setMyRsvps] = useState<Set<number>>(new Set());
    const { user } = useAuth();
    const navigate = useNavigate();
    const isEditor = isAdmin;

    const handleEventSave = (statusOk: boolean, message: string) => {
        setEditingEvent(null);
        notification(statusOk, message);
        displayEvents();
    };

      
    const displayEvents = () =>{
            console.log("Redisplaying events")
            fetch("http://localhost:3000/api/get-events")
            .then((res) => res.json())
            .then((data) => {
              setEvents(data);
            })
            .catch((err) => console.error("EVENT ERROR:", err));
    }

    const fetchMyRsvps = () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        fetch("http://localhost:3000/api/my-rsvps", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => setMyRsvps(new Set(data)))
        .catch(err => console.error("RSVP fetch error:", err));
    };

    useEffect(() => {
        displayEvents();
        fetchMyRsvps();
    }, [user]);

    const handleRsvp = async (eventId: number) => {
        const token = localStorage.getItem("token");
        if (!token) { navigate("/login"); return; }

        const alreadySignedUp = myRsvps.has(eventId);
        const method = alreadySignedUp ? "DELETE" : "POST";

        try {
            const response = await fetch("http://localhost:3000/api/rsvp", {
                method,
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ eventId })
            });
            if (response.ok) {
                setMyRsvps(prev => {
                    const next = new Set(prev);
                    alreadySignedUp ? next.delete(eventId) : next.add(eventId);
                    return next;
                });
                setEvents(prev => prev.map(e =>
                    e.id === eventId
                        ? { ...e, rsvp_count: alreadySignedUp ? e.rsvp_count - 1 : e.rsvp_count + 1 }
                        : e
                ));
                notification(true, alreadySignedUp ? "RSVP cancelled." : "Successfully signed up!");
            } else {
                const err = await response.json().catch(() => null);
                notification(false, err?.message || "Failed to update RSVP.");
            }
        } catch (err) {
            notification(false, "Network error.");
        }
    };

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

    const now = new Date();
    const filteredEvents = events.filter((event) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q ||
        event.title?.toLowerCase().includes(q) ||
        event.location?.toLowerCase().includes(q) ||
        event.description?.toLowerCase().includes(q);

      let matchesDate = true;
      if (filterRange === 'week' || filterRange === 'month') {
        const eventDate = event.date ? new Date(event.date) : null;
        if (eventDate) {
          if (filterRange === 'week') {
            const weekOut = new Date(now);
            weekOut.setDate(now.getDate() + 7);
            matchesDate = eventDate >= now && eventDate <= weekOut;
          } else {
            const monthOut = new Date(now);
            monthOut.setMonth(now.getMonth() + 1);
            matchesDate = eventDate >= now && eventDate <= monthOut;
          }
        }
      }

      return matchesSearch && matchesDate;
    });

    return(
        <div>
            <div className = "event-header" style={{ }}>
                <h2 className="section-label" style={{margin: '0'}}>Upcoming Events</h2>
                {isAdmin && <button id="createEventButton" onClick={() => {console.log("creating event"); setIsCreatingEvent(true);}}>Create Event</button>}
            </div>
            {isCreatingEvent && <EventCreationModal onClose={() => setIsCreatingEvent(false)} onCreation={handleEventCreation} />}
            {editingEvent && <EventEditModal event={editingEvent} onClose={() => setEditingEvent(null)} onSave={handleEventSave} />}
            {filteredEvents.length > 0 ? (
              <div className="event-grid">
                {filteredEvents.map((event) => {
                  const formattedDate = event.date ? new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "TBA";
                  return (
                    <div className="event-card" key={event.id}>
                      <h4>{event.title}</h4>
                      {formattedDate && <p><strong>Date:</strong> {formattedDate}</p>}
                      {event.time && <p><strong>Time:</strong> {event.time}</p>}
                      {event.location && <p><strong>Location:</strong> {event.location}</p>}
                      {event.description && <p className="event-card-description"><strong>Description:</strong> {event.description}</p>}
                      <div className="event-card-actions">
                        <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            {event.rsvp_count || 0} attending
                        </p>
                        {user ? (
                            myRsvps.has(event.id) ? (
                                <button className="event-button event-button--danger" onClick={() => handleRsvp(event.id)}>Cancel RSVP</button>
                            ) : (
                                <button className="event-button" onClick={() => handleRsvp(event.id)}>Sign Up</button>
                            )
                        ) : (
                            <button className="event-button" onClick={() => navigate("/login")}>Login to RSVP</button>
                        )}
                        {isEditor && <button className="event-button" onClick={() => setEditingEvent(event)}>Edit Event</button>}
                        {isEditor && <button className="event-button event-button--danger" onClick={() => deletingEvent(event.id)}>Delete Event</button>}
                      </div>
                    </div>
                  );
                })}
              </div>
          ) : (
            <p>{searchQuery || filterRange !== 'all' ? 'No events match your search.' : 'No upcoming events yet.'}</p>
          )}
        </div>
    )
}

export default EventList;
