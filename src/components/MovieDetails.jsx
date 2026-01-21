import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const api_key = "aa5256cf47cf8a13c8ec1c106faf45bf";

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchDetails = async () => {
      try {
        const movieRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`
        );
        const movieData = await movieRes.json();
        setMovie(movieData);

        const creditsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`
        );
        const creditsData = await creditsRes.json();
        setCast(creditsData.cast.slice(0, 10));

        const reviewsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${api_key}`
        );
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData.results.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!movie) return <div className="loading">Loading...</div>;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://picsum.photos/seed/${id}/500/750`;

  const bannerUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : imageUrl;

  return (
    <>
      <Header />
      <div className="movie-details-container">
        {/* Hero Banner with Glassmorphism */}
        <div
          className="details-banner"
          style={{
            backgroundImage: `url(${bannerUrl})`,
          }}
        >
          <div className="banner-overlay"></div>
          <div className="details-header">
            <div className="details-poster">
              <img src={imageUrl} alt={movie.title} />
            </div>
            <div className="details-info">
              <h1 className="details-title">{movie.title}</h1>
              <div className="details-meta">
                <span className="release-date">
                  {movie.release_date?.split("-")[0]}
                </span>
                <span className="runtime">{movie.runtime} min</span>
                <span className="rating">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </span>
              </div>
              <div className="genres">
                {movie.genres?.map((g) => (
                  <span key={g.id} className="genre-tag">
                    {g.name}
                  </span>
                ))}
              </div>
              <p className="tagline">{movie.tagline}</p>
              <div className="overview">
                <h3>Overview</h3>
                <p>{movie.overview}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="details-content">
          {/* Cast Section */}
          <section className="cast-section">
            <h2>Top Cast</h2>
            <div className="cast-grid">
              {cast.map((actor) => (
                <div key={actor.id} className="cast-card">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : `https://ui-avatars.com/api/?name=${actor.name}`
                    }
                    alt={actor.name}
                  />
                  <p className="actor-name">{actor.name}</p>
                  <p className="character-name">{actor.character}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews Section */}
          <section className="reviews-section">
            <h2>Reviews</h2>
            {reviews.length > 0 ? (
              <div className="reviews-list">
                {reviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <span className="author">By {review.author}</span>
                      {review.author_details?.rating && (
                        <span className="review-rating">
                          ⭐ {review.author_details.rating}
                        </span>
                      )}
                    </div>
                    <p className="review-content">
                      {review.content.slice(0, 300)}
                      {review.content.length > 300 && "..."}
                    </p>
                    <a
                      href={review.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="read-more"
                    >
                      Read full review
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews available yet.</p>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default MovieDetails;
