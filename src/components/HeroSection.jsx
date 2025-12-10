import { useEffect, useState } from "react";

function HeroSection() {
  const api_key = "aa5256cf47cf8a13c8ec1c106faf45bf";
  const [heroMovie, setHeroMovie] = useState(null);

  useEffect(() => {
    const fetchHeroMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=1`
        );
        const data = await response.json();
        setHeroMovie(data.results[0]);
      } catch (error) {
        console.error("Failed to fetch hero movie:", error);
      }
    };

    fetchHeroMovie();
  }, []);

  if (!heroMovie) return null;

  const backdropUrl = heroMovie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`
    : `https://picsum.photos/seed/${heroMovie.id}/1920/1080`;

  return (
    <section className="hero-section">
      <div className="hero-background">
        <img src={backdropUrl} alt={heroMovie.title} />
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content">
        <h1 className="hero-title">{heroMovie.title}</h1>
        <p className="hero-description">{heroMovie.overview}</p>
        <div className="hero-buttons">
          <button className="hero-btn play-btn">▶ Play</button>
          <button className="hero-btn info-btn">ℹ More Info</button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
