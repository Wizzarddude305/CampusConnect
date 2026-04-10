import Navbar from '../components/Navbar';
import Header from '../components/Header'
import { useEffect, useState } from "react";
import { useAuth } from '../components/AuthContext';


function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const { user } = useAuth();
  const isAdmin = user?.privilege === 'admin';


  useEffect(() => {
    if (isAdmin) {
      fetch("http://localhost:3001/api/events?privilege=admin")
        .then((res) => res.json())
        .then((data) => {
          console.log("EVENTS:", data);
          setEvents(data);
        })
        .catch((err) => console.error("EVENT ERROR:", err));
    } else {
      setEvents([]);
    }

    fetch("http://localhost:3001/api/test/users")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA:", data);
        setUsers(data);
      })
      .catch((err) => console.error("ERROR:", err));
  }, [isAdmin, user?.privilege]);
  return (
    <main>
      <Navbar />
      <Header />
      <section className="placeholder-section">
        <div className="placeholder-card">
          <p className="section-label">Upcoming Events</p>

          <h2>Event listings coming soon</h2>

          <p>
            Events will appear here once the backend, database,
            and event creation features are implemented.
          </p>

          {events.length > 0 && (
            <div>
              <h3>Upcoming Events</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {events.map((event) => {
                  const formattedDate = event.date ? new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : null;
                  return (
                    <div key={event.id} style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9', minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
                      <h4 style={{ marginTop: 0 }}>{event.title}</h4>
                      {formattedDate && <p><strong>Date:</strong> {formattedDate}</p>}
                      {event.location && <p><strong>Location:</strong> {event.location}</p>}
                      {event.description && <p style={{ flex: 1 }}>{event.description}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <h3>Test Users (from backend):</h3>

          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            users.map((user) => (
              <div key={user.id}>
                {user.name} - {user.email}
              </div>
            ))
          )}

        </div>
      </section>
    </main>
  );
}

export default Home
