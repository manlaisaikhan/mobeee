"use client";
import { useState, useEffect } from "react";
import { PLayIcons } from "../icons/playicons";
import { StarIcons } from "../icons/staricons";

const apiLink =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const HeroSection = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(apiLink, options);
        const json = await res.json();
        // intentionally slow down loading for 2 seconds
        setTimeout(() => {
          setMovies(json.results.slice(0, 5));
          setLoading(false);
        }, 2000);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const fetchTrailer = async (movieId) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        options
      );
      const json = await res.json();
      const trailer = json.results.find((vid) => vid.type === "Trailer");
      if (trailer) {
        setTrailerKey(trailer.key);
        setShowTrailer(true);
      } else {
        alert("Trailer not found!");
      }
    } catch (err) {
      console.error("Trailer fetch error:", err);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, movies.length - 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // 🌀 LOADING (2 секунд удаан гардаг)
  if (loading) {
    return (
      <div className="w-[1440px] h-[600px] flex items-center justify-center bg-gray-300 mt-[72px]">
        <div className="flex flex-col items-center gap-4 animate-fadeIn">
          <div className="w-16 h-16 border-4 border-gray-400 border-t-white rounded-full animate-spin"></div>
          <p className="text-white text-lg animate-pulse">Loading movies...</p>
        </div>
      </div>
    );
  }

  if (movies.length === 0)
    return (
      <p className="text-white mt-[72px] text-center text-lg">
        No movies found.
      </p>
    );

  return (
    <div className="w-[1440px] h-[600px] relative overflow-hidden mt-[72px] max-sm:w-[375px]">
      <div
        className="flex h-full transition-transform duration-700"
        style={{ transform: `translateX(-${currentIndex * 1440}px)` }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="w-[1440px] h-full flex-shrink-0 relative"
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover z-0 max-sm:object-cover max-sm:w-[375px]"
            />
            <div className="absolute top-0 left-20 p-12 flex items-center h-full text-white bg-gradient-to-r from-black/80 to-transparent">
              <div className="flex flex-col gap-6 max-w-[600px] transition-all duration-500">
                <span className="uppercase text-sm tracking-wider max-sm:hidden">
                  Now Playing
                </span>
                <h1 className="text-5xl font-bold max-sm:hidden">
                  {movie.title}
                </h1>
                <div className="flex items-center gap-2 max-sm:hidden">
                  <StarIcons />
                  <span className="text-lg max-sm:hidden">
                    {movie.vote_average.toFixed(1)}/
                    <span className="text-gray-400">10</span>
                  </span>
                </div>
                <p className="leading-relaxed text-gray-200">
                  {movie.overview}
                </p>
                <div className="mt-2">
                  <button
                    onClick={() => fetchTrailer(movie.id)}
                    className="flex items-center gap-2 px-5 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition"
                  >
                    <PLayIcons />
                    <span>Watch Trailer</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      {currentIndex > 0 && (
        <button
          onClick={prevSlide}
          className="flex items-center justify-center absolute w-[40px] h-[40px] left-5 top-1/2 -translate-y-1/2 bg-white text-black rounded-full shadow-lg hover:bg-gray-300"
        >
          ❮
        </button>
      )}
      {currentIndex < movies.length - 1 && (
        <button
          onClick={nextSlide}
          className="flex items-center justify-center absolute w-[40px] h-[40px] right-5 top-1/2 -translate-y-1/2 bg-white text-black rounded-full shadow-lg hover:bg-gray-300"
        >
          ❯
        </button>
      )}

      {/* Trailer modal */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-[9999]">
          <div className="overflow-hidden shadow-xl bg-black rounded-xl p-4 relative w-[800px] h-[500px]">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-2 right-2 text-white px-3 py-1 rounded hover:bg-gray-800"
            >
              ✕
            </button>
            {trailerKey ? (
              <iframe
                width="100%"
                height="500"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <p className="text-white">No Trailer available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
