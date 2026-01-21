import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import SearchSection from "./components/SearchSection";
import TrendingSection from "./components/TrendingSection";
import LanguageSection from "./components/LanguageSection";
import AllMoviesSection from "./components/AllMoviesSection";

import { Routes, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";

function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <SearchSection />
      <TrendingSection />
      <LanguageSection />
      <AllMoviesSection />
    </>
  );
}

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

// Header Component

// Hero Section Component

// Search Section Component

// Trending Section Component

// Language Section Component

// All Movies Section Component

// Unified Card Component (For Horizontal Scroll) - WITH PLACEHOLDER

// Grid Card Component (For Grid Layout) - WITH PLACEHOLDER

export default App;
