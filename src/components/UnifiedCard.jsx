import { Link } from "react-router-dom";

function UnifiedCard({ movie, rank }) {
  const { id, title, poster_path, vote_average } = movie;

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : `https://picsum.photos/seed/${id}/500/750`;

  return (
    <Link to={`/movie/${id}`} className="unified-card">
      {rank && <div className="rank-badge">{rank}</div>}
      <div className="unified-image">
        <img
          src={imageUrl}
          alt={title}
          onError={(e) => {
            e.target.src = `https://picsum.photos/seed/movie${id}/500/750`;
          }}
        />
        <div className="unified-overlay">
          <h4 className="unified-title">{title}</h4>
          <span className="unified-rating">
            ⭐ {vote_average?.toFixed(1) || "N/A"}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default UnifiedCard;
