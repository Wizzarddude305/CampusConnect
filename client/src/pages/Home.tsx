import Header from '../components/Header'
import { useEffect, useState } from "react";


function Home() {
  const [users, setUsers] = useState<any[]>([]);


  useEffect(() => {
    fetch("http://localhost:3001/api/test/users")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA:", data);
        setUsers(data);
      })
      .catch((err) => console.error("ERROR:", err));
  }, []);
  return (
    <main>
      <Header />

      <section className="placeholder-section">
        <div className="placeholder-card">
          <p className="section-label">Upcoming Events</p>

          <h2>Event listings coming soon</h2>

          <p>
            Events will appear here once the backend, database,
            and event creation features are implemented.
          </p>

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
  )
}

export default Home
