import { useEffect, useState } from "react";
import GridCard from "./GridCard";

function SearchSection() {
  const api_key = "aa5256cf47cf8a13c8ec1c106faf45bf";
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchMovies = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchQuery}&page=1`
        );
        const data = await response.json();
        setSearchResults(data.results.slice(0, 20));
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchMovies, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <section className="content-section search-wrapper">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      {loading && <p className="loading-text">Searching...</p>}

      {searchQuery && !loading && searchResults.length === 0 && (
        <p className="no-results">No results found for "{searchQuery}"</p>
      )}

      {searchResults.length > 0 && (
        <>
          <h2 className="section-title">Search Results</h2>
          <div className="movie-grid">
            {searchResults.map((movie) => (
              <GridCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default SearchSection;
