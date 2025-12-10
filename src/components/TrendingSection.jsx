import { useEffect, useState } from "react";
import UnifiedCard from "./UnifiedCard";

function TrendingSection() {
  const api_key = "aa5256cf47cf8a13c8ec1c106faf45bf";
  const [trendingWeek, setTrendingWeek] = useState([]);

  useEffect(() => {
    const fetchTrendingWeek = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}`
        );
        const data = await response.json();
        setTrendingWeek(data.results.slice(0, 10));
      } catch (error) {
        console.error("Failed to fetch trending week:", error);
      }
    };
    fetchTrendingWeek();
  }, []);

  return (
    <section className="content-section">
      <h2 className="section-title">📈 Top 10 Trending This Week</h2>
      <div className="unified-scroll">
        {trendingWeek.map((movie, index) => (
          <UnifiedCard key={movie.id} movie={movie} rank={index + 1} />
        ))}
      </div>
    </section>
  );
}

export default TrendingSection;
