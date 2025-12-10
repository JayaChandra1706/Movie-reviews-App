import { useEffect, useState } from "react";

import GridCard from "./GridCard";

function AllMoviesSection() {
  const api_key = "aa5256cf47cf8a13c8ec1c106faf45bf";
  const [infiniteMovies, setInfiniteMovies] = useState([]);
  const [infinitePage, setInfinitePage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchInfiniteMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&page=${infinitePage}`
        );
        const data = await response.json();

        if (infinitePage === 1) {
          setInfiniteMovies(data.results);
        } else {
          setInfiniteMovies((prev) => [...prev, ...data.results]);
        }

        setHasMore(infinitePage < data.total_pages);
      } catch (error) {
        console.error("Failed to fetch infinite movies:", error);
      }
    };
    fetchInfiniteMovies();
  }, [infinitePage]);

  const loadMore = () => {
    setInfinitePage((prev) => prev + 1);
  };

  return (
    <section className="content-section">
      <h2 className="section-title">🎬 Popular Movies</h2>
      <div className="movie-grid">
        {infiniteMovies.map((movie, index) => (
          <GridCard key={`${movie.id}-${index}`} movie={movie} />
        ))}
      </div>
      {hasMore && (
        <button className="load-more-btn" onClick={loadMore}>
          Load More
        </button>
      )}
    </section>
  );
}

export default AllMoviesSection;
