"use client";
import { useState } from "react";
import { ButtonIcon } from "../icons/buttonicon";
import { DownIcons } from "../icons/downicons";
import { FileIcons } from "../icons/fileicons";
import { Moveblue } from "../icons/movieblue";
import { SearchIcons } from "../icons/searchicons";
import { LeftIcon } from "../icons/lefticon";

export const Header = () => {
  const [showGenres, setShowGenres] = useState(false);

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film-Noir",
    "Game-Show",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "News",
    "Reality-TV",
    "Romance",
    "Sci-Fi",
    "Short",
    "Sport",
    "Talk-Show",
    "Thriller",
    "War",
    "Western",
  ];

  return (
    <div className="flex w-full justify-between px-20 items-center relative">
      <div className="flex justify-center items-center gap-2">
        <FileIcons />
        <Moveblue />
      </div>

      <div className="flex items-center gap-3 relative">
        <button
          onClick={() => setShowGenres(!showGenres)}
          className="flex items-center border-gray-50 gap-2 rounded-lg px-4 py-2 bg-white shadow-sm hover:bg-gray-100 transition"
        >
          <DownIcons />
          <p className="text-sm">Genre</p>
        </button>

        {showGenres && (
          <div className="absolute top-11 left-0 bg-white  border-gray-50 rounded-lg shadow-lg w-[500px] p-4 z-50">
            <h3 className="font-semibold text-lg">Genres</h3>
            <p className="text-sm text-gray-500 mb-3">
              See lists of movies by genre
            </p>
            <div className="flex flex-wrap gap-4 ">
              {genres.map((g, i) => (
                <button
                  key={i}
                  className=" flex px-3 py-1 border rounded-full text-sm hover:bg-gray-200"
                >
                  {g}
                  <LeftIcon />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex placeholder:text-gray-100 items-center gap-2 border rounded-lg px-4 py-2">
          <SearchIcons />
          <input
            placeholder="Search"
            type="text"
            name="search"
            className="outline-none text-sm"
          />
        </div>
      </div>

      <div className="flex items-center w-[36px] h-[36px] border border-gray-100 rounded-md justify-center">
        <ButtonIcon />
      </div>
    </div>
  );
};
