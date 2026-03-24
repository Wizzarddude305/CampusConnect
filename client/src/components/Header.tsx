import SearchBar from "./SearchBar"

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
          <SearchBar></SearchBar>
      </div>
    </section>
  )
}

export default Header