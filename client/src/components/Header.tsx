
function Header() {
  return (
    <section className="header-section">
      <div className="header-content">
        <p className="eyebrow">University of Florida</p>
        <h1>Discover Campus Life in One Place</h1>
        <p className="header-subtext">
          CampusConnect helps students explore organizations, stay informed, and
          connect with campus opportunities.
        </p>

        <div className="search-row">
          <input
            type="text"
            placeholder="Search will be enabled with future event and organization data"
            className="search-input"
          />
          <button className="search-button">Explore</button>
        </div>
      </div>
    </section>
  )
}

export default Header