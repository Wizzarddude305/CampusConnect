import Navbar from '../components/Navbar';
import Header from '../components/Header'
import Events from '../components/Events';
import Organizations from '../components/Organizations';
import { useEffect, useState } from "react";
import { useAuth } from '../components/AuthContext';


function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRange, setFilterRange] = useState('all');
  const { user } = useAuth();
  const isAdmin = user?.privilege === 'admin';
  

  return (
    <main>
      <Navbar />
      <Header searchQuery={searchQuery} onSearch={setSearchQuery} filterRange={filterRange} onFilter={setFilterRange} />
      <section className="placeholder-section">
        <div className="placeholder-card">
          <Events isAdmin={isAdmin} searchQuery={searchQuery} filterRange={filterRange} />
        </div>
      </section>
    </main>
  );
}

export default Home
