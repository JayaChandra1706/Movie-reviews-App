import { useEffect, useRef, useState } from "react";
import UnifiedCard from "./UnifiedCard";

function LanguageSection() {
  const api_key = "aa5256cf47cf8a13c8ec1c106faf45bf";
  const [selectedLanguage, setSelectedLanguage] = useState("te");
  const [languageMovies, setLanguageMovies] = useState([]);
  const scrollRef = useRef(null);

  const languages = [
    { code: "te", name: "Telugu" },
    { code: "hi", name: "Hindi" },
    { code: "ta", name: "Tamil" },
    { code: "ml", name: "Malayalam" },
    { code: "kn", name: "Kannada" },
    { code: "en", name: "English" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
  ];

  useEffect(() => {
    const fetchLanguageMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_original_language=${selectedLanguage}&sort_by=popularity.desc&page=1`
        );
        const data = await response.json();
        setLanguageMovies(data.results.slice(0, 15));

        // Reset scroll position to start
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = 0;
        }
      } catch (error) {
        console.error("Failed to fetch language movies:", error);
      }
    };
    fetchLanguageMovies();
  }, [selectedLanguage]);

  return (
    <section className="content-section">
      <h2 className="section-title">🌏 Popular by Language</h2>
      <div className="language-tabs">
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={
              selectedLanguage === lang.code ? "lang-btn active" : "lang-btn"
            }
            onClick={() => setSelectedLanguage(lang.code)}
          >
            {lang.name}
          </button>
        ))}
      </div>
      <div className="unified-scroll" ref={scrollRef}>
        {languageMovies.map((movie) => (
          <UnifiedCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default LanguageSection;
