// Search input and date filter dropdown
import "../styles/auth.css"

interface SearchBarProps {
  searchQuery: string;
  onSearch: (q: string) => void;
  filterRange: string;
  onFilter: (f: string) => void;
}

function SearchBar({ searchQuery, onSearch, filterRange, onFilter }: SearchBarProps) {
  return (
    <div className="search-row">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search events by title, location, or description..."
        className="search-input"
      />
      {/* Filter by all dates, this week, or this month */}
      <select
        value={filterRange}
        onChange={(e) => onFilter(e.target.value)}
        className="search-filter"
      >
        <option value="all">All Dates</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>
    </div>
  );
}

export default SearchBar;
