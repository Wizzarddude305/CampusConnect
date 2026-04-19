import Navbar from '../components/Navbar';
import Header from '../components/Header'
import Events from '../components/Events';
import Organizations from '../components/Organizations';
import { useEffect, useState } from "react";
import { useAuth } from '../components/AuthContext';


function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const { user } = useAuth();
  const isAdmin = user?.privilege === 'admin';
  

  //Check for the availability of events and users every time yser privilege or the isAdmin variab;e is changed
  useEffect(() => {
    if (isAdmin) {
      fetch("http://localhost:3000/api/events?privilege=admin")
        .then((res) => res.json())
        .then((data) => {
          setEvents(data);
        })
        .catch((err) => console.error("EVENT ERROR:", err));
    } else {
      setEvents([]);
    }

    fetch("http://localhost:3000/api/test/users")
      .then((res) => res.json())
      .then((data) => {
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
          <Events isAdmin={isAdmin} />
        </div>
      </section>
    </main>
  );
}

export default Home
