function GridCard({ movie }) {
  const { id, title, poster_path, vote_average } = movie;

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : `https://picsum.photos/seed/${id}/500/750`;

  return (
    <div className="grid-card">
      <div className="grid-image">
        <img
          src={imageUrl}
          alt={title}
          onError={(e) => {
            e.target.src = `https://picsum.photos/seed/movie${id}/500/750`;
          }}
        />
        <div className="grid-overlay">
          <h4 className="grid-title">{title}</h4>
          <span className="grid-rating">
            ⭐ {vote_average?.toFixed(1) || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default GridCard;
