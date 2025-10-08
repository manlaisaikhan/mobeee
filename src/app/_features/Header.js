"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ButtonIcon } from "../icons/buttonicon";
import { DownIcons } from "../icons/downicons";
import { FileIcons } from "../icons/fileicons";
import { Moveblue } from "../icons/movieblue";
import { SearchIcons } from "../icons/searchicons";
import { LeftIcon } from "../icons/lefticon";
import { JijegOd } from "../icons/jijegod";

export const Header = () => {
  const router = useRouter();
  const [showGenres, setShowGenres] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("bg-black", !isDarkMode);
    document.body.classList.toggle("bg-white", isDarkMode);
  };

  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Sci-Fi" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  useEffect(() => {
    document.body.classList.add("bg-white");
  }, []);
  useEffect(() => {
    if (searchValue.trim() === "") {
      setSearchResults([]);
      return;
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
      },
    };
    const fetchMovies = async () => {
      setIsSearching(true);
      try {
        const page = 1;
        const data = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=1`,
          options
        );

        const jsonData = await data.json();
        console.log(jsonData, "ggggg");
        setSearchResults(jsonData.results?.slice(0, 6) || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setIsSearching(false);
      }
    };

    const delay = setTimeout(fetchMovies, 500);
    return () => clearTimeout(delay);
  }, [searchValue]);

  // 🎬 Genre click
  const handleGenreClick = async (genre) => {
    setIsSearching(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genre.id}&page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );
      const data = await res.json();
      setSearchResults(data.results?.slice(0, 6) || []);
      setSearchValue(genre.name);
      setShowGenres(false);
    } catch (err) {
      console.error(" Error fetching genre movies:", err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <header
      className={`flex justify-between items-center w-full px-6 py-4 shadow-sm relative z-50 transition-colors duration-500 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center gap-2">
        <FileIcons />
        <Moveblue />
      </div>

      <div className="flex items-center gap-4 relative">
        <button
          onClick={() => setShowGenres(!showGenres)}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 border shadow-sm transition ${
            isDarkMode
              ? "bg-gray-900 border-gray-700 text-white hover:bg-gray-800"
              : "bg-white border-gray-200 text-black hover:bg-gray-100"
          }`}
        >
          <DownIcons />
          <p className="text-sm font-medium">Genre</p>
        </button>

        {showGenres && (
          <div
            className={`absolute top-12 left-0 w-[480px] p-4 rounded-lg shadow-lg z-50 ${
              isDarkMode
                ? "bg-gray-900 border border-gray-700 text-white"
                : "bg-white border border-gray-100 text-black"
            }`}
          >
            <h3 className="font-semibold text-lg mb-1">Genres</h3>
            <p className="text-sm mb-3">See lists of movies by genre</p>
            <div className="flex flex-wrap gap-3">
              {genres.map((g) => (
                <button
                  key={g.id}
                  onClick={() => handleGenreClick(g)}
                  className={`flex items-center gap-1 px-3 py-1 border rounded-full text-sm transition ${
                    isDarkMode
                      ? "border-gray-700 hover:bg-gray-800 text-white"
                      : "border-gray-200 hover:bg-gray-100 text-black"
                  }`}
                >
                  {g.name} <LeftIcon />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="relative">
          <div
            className={`flex items-center gap-2 rounded-lg px-4 py-2 w-[250px] md:w-[300px] border transition ${
              isDarkMode
                ? "bg-gray-900 border-gray-700 text-white"
                : "bg-white border-gray-200 text-black"
            }`}
          >
            <SearchIcons />
            <input
              placeholder="Search"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchValue.trim() !== "") {
                  router.push(
                    `/search?query=${encodeURIComponent(searchValue)}`
                  );
                }
              }}
              className="outline-none text-sm w-full bg-transparent"
            />
          </div>

          {searchValue.trim() !== "" && (
            <div
              className={`absolute top-11 left-0 w-full max-h-[400px] overflow-y-auto rounded-lg shadow-lg z-50 ${
                isDarkMode
                  ? "bg-gray-900 border border-gray-700 text-white"
                  : "bg-white border border-gray-100 text-black"
              }`}
            >
              {!isSearching ? (
                searchResults.length > 0 ? (
                  searchResults.map((movie) => (
                    <a
                      key={movie.id}
                      href={`/movie-details/${movie.id}`}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 transition"
                    >
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt={movie.title}
                          className="w-10 h-14 object-cover rounded"
                        />
                      ) : (
                        <div className="w-10 h-14 bg-gray-500 rounded" />
                      )}
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">
                          {movie.title}
                        </span>
                        <span className="flex items-center justify-center text-xs text-gray-400">
                          <JijegOd /> {movie.vote_average?.toFixed(1) || "N/A"}
                        </span>
                      </div>
                    </a>
                  ))
                ) : (
                  <p className="text-center py-4 text-gray-400 text-sm">
                    No results found for "{searchValue}"
                  </p>
                )
              ) : (
                <p className="text-center py-4 text-gray-400 text-sm">
                  Searching...
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div
        onClick={handleToggleMode}
        className="flex items-center justify-center w-[36px] h-[36px] border rounded-md hover:bg-gray-300 transition cursor-pointer"
      >
        <ButtonIcon />
      </div>
    </header>
  );
};
