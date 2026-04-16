import Navbar from '../components/Navbar';
import Header from '../components/Header'
import Events from '../components/Events';
import { useEffect, useState } from "react";
import { useAuth } from '../components/AuthContext';


function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const { user } = useAuth();
  const isAdmin = user?.privilege === 'admin';

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
