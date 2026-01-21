import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-left">
        <Link to="/" className="logo">
          MOVIEHUB
        </Link>
        <nav className="main-nav">
          <Link to="/" className="nav-link active">
            Home
          </Link>
          <a href="#" className="nav-link">
            TV Shows
          </a>
          <a href="#" className="nav-link">
            Movies
          </a>
          <a href="#" className="nav-link">
            New & Popular
          </a>
          <a href="#" className="nav-link">
            My List
          </a>
        </nav>
      </div>
      <div className="header-right">
        <span className="icon search-icon">🔍</span>
        <span className="icon bell-icon">🔔</span>
        <span className="user-icon">👤</span>
      </div>
    </header>
  );
}

export default Header;
