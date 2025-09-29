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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(apiLink, options);
        const json = await res.json();
        setMovies(json.results.slice(0, 3));
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchMovies();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, movies.length - 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  if (movies.length === 0) return <p className="text-white">Loading...</p>;

  return (
    <div className="w-[1440px] h-[600px] relative overflow-hidden">
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
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-20 p-12 flex items-center h-full text-white">
              <div className="flex flex-col gap-6 max-w-[600px] transition-all duration-500">
                <span className="uppercase text-sm tracking-wider">
                  Now Playing
                </span>
                <h1 className="text-5xl font-bold">{movie.title}</h1>
                <div className="flex items-center gap-2">
                  <StarIcons />
                  <span className="text-lg">
                    {movie.vote_average.toFixed(1)}/
                    <span className="text-gray-400">10</span>
                  </span>
                </div>
                <p className="leading-relaxed text-gray-200">
                  {movie.overview}
                </p>
                <div className="mt-2">
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.youtube.com/results?search_query=${movie.title} trailer`,
                        "_blank"
                      )
                    }
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
    </div>
  );
};
