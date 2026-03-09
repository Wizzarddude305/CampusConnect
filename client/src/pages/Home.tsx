import Header from '../components/Header'

function Home() {
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
        </div>
      </section>
    </main>
  )
}

export default Home