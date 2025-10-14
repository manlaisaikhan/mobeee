"use client";
import { useEffect, useState } from "react";
import { Poster } from "../_components/Poster";
import { SectionHeader } from "../_components/SectionHeader";

const apilink =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const PopularMovieList = () => {
  const [popularMovieList, setPopularMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const data = await fetch(apilink, options);
      const jsonData = await data.json();

      // Loader-г бага зэрэг удаашруулъя (2 секунд)
      setTimeout(() => {
        setPopularMovieList(jsonData.results.slice(0, 10));
        setLoading(false);
      }, 2000);
    } catch (err) {
      console.error("Fetch error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // ✅ LOADING SKELETON
  if (loading) {
    return (
      <div className="w-full flex flex-col gap-8 px-10 animate-fadeIn">
        {/* Title skeleton */}
        <div className="flex justify-between items-center w-full animate-pulse">
          <div className="bg-gray-700/30 dark:bg-gray-200/20 w-[200px] h-6 rounded-full"></div>
          <div className="bg-gray-700/30 dark:bg-gray-200/20 w-[100px] h-6 rounded-full"></div>
        </div>

        {/* Posters skeleton */}
        <div className="grid grid-cols-5 gap-[60px] mt-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-700/30 dark:bg-gray-200/20 w-[229px] h-[439px] rounded-2xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // ✅ MAIN CONTENT
  return (
    <div className="w-full flex flex-col items-start px-10 animate-fadeIn">
      <SectionHeader SectionTitle="Popular" seeMoreLink="/popular" />

      <div className="grid grid-cols-5 gap-[60px] mt-6">
        {popularMovieList.map((movie, index) => (
          <Poster
            key={index}
            posterImage={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            posterTitle={movie.title}
            rating={movie.vote_average.toFixed(1)}
            movieId={movie.id}
          />
        ))}
      </div>
    </div>
  );
};
