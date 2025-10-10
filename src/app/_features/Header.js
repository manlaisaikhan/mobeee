"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaAngleDown } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { JijegOd } from "../icons/jijegod";
import { FileIcons } from "../icons/fileicons";
import { Moveblue } from "../icons/movieblue";
import { ToggleTheme } from "../_components/theme-toggle";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const Header = () => {
  const router = useRouter();
  const [showGenres, setShowGenres] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

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

  // 🔍 Search
  useEffect(() => {
    if (searchValue.trim() === "") {
      setSearchResults([]);
      return;
    }

    const fetchMovies = async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=1`,
          options
        );
        const jsonData = await res.json();
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

  const handleGenreClick = (genre) => {
    router.push(`/Genredetails/${genre.id}?name=${genre.name}`);
    setShowGenres(false);
  };

  return (
    <header
      className="fixed top-0 left-0 flex justify-between items-center w-full px-6 py-4 shadow-sm 
      z-50 transition-colors duration-500 bg-white/80 dark:bg-black/80 backdrop-blur-md"
    >
      {/* 🔹 Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <FileIcons />
        <Moveblue />
      </div>

      {/* 🔹 Genre + Search хэсэг */}
      <div className="flex items-center gap-4 relative">
        {/* Genre dropdown */}
        <button
          onClick={() => setShowGenres(!showGenres)}
          className="flex items-center gap-2 rounded-lg px-4 py-2 border shadow-sm transition"
        >
          <FaAngleDown />
          <p className="text-sm font-medium">Genre</p>
        </button>

        {showGenres && (
          <div className="absolute top-12 left-0 w-[480px] p-4 rounded-lg shadow-lg z-[9999] dark:bg-black bg-white">
            <h3 className="font-semibold text-lg mb-1">Genres</h3>
            <p className="text-sm mb-3">See lists of movies by genre</p>
            <div className="flex flex-wrap gap-3">
              {genres.map((g) => (
                <button
                  key={g.id}
                  onClick={() => handleGenreClick(g)}
                  className="flex items-center gap-1 hover:text-blue-500 transition"
                >
                  {g.name} <MdNavigateNext />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search box */}
        <div className="relative">
          <div className="flex items-center gap-2 rounded-lg px-4 py-2 w-[250px] md:w-[300px] dark:bg-black bg-white">
            <IoMdSearch />
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

          {/* Search results */}
          {searchValue.trim() !== "" && (
            <div className="absolute top-11 left-0 w-full max-h-[400px] overflow-y-auto rounded-lg shadow-lg z-[9999] dark:bg-black bg-white">
              {!isSearching ? (
                searchResults.length > 0 ? (
                  searchResults.map((movie) => (
                    <a
                      key={movie.id}
                      href={`/movie-details/${movie.id}`}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt={movie.title}
                          className="w-10 h-14 object-cover rounded"
                        />
                      ) : (
                        <div className="w-10 h-14 bg-gray-300 rounded" />
                      )}
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">
                          {movie.title}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <JijegOd /> {movie.vote_average?.toFixed(1) || "N/A"}
                        </span>
                      </div>
                    </a>
                  ))
                ) : (
                  <p className="text-center py-4 text-sm">
                    No results found for "{searchValue}"
                  </p>
                )
              ) : (
                <p className="text-center py-4 text-sm">Searching...</p>
              )}
            </div>
          )}
        </div>

        <ToggleTheme />
      </div>
    </header>
  );
};
