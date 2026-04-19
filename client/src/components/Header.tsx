// Hero banner with the search bar underneath
import SearchBar from "./SearchBar"

interface HeaderProps {
  searchQuery: string;
  onSearch: (q: string) => void;
  filterRange: string;
  onFilter: (f: string) => void;
}

function Header({ searchQuery, onSearch, filterRange, onFilter }: HeaderProps) {
  return (
    <section className="header-section">
      <div className="header-content">
        <p className="eyebrow">University of Florida</p>
        <h1>Discover Campus Life</h1>
        <p className="header-subtext">
          CampusConnect helps students explore organizations, stay informed, and
          connect with campus opportunities.
        </p>
        <SearchBar searchQuery={searchQuery} onSearch={onSearch} filterRange={filterRange} onFilter={onFilter} />
      </div>
    </section>
  )
}

export default Header