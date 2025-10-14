"use client";
import { useEffect, useState } from "react";
import { Poster } from "../_components/Poster";
import { SectionHeader } from "../_components/SectionHeader";
import { useRouter } from "next/navigation";

const apilink =
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const UpcomingMovieList02 = () => {
  const [upcomingMovieList, setUpcomingMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const totalPages = 73;

  const router = useRouter();

  const getData = async (pageNum) => {
    setLoading(true);
    try {
      const data = await fetch(apilink + pageNum, options);
      const jsonData = await data.json();

      // ⏳ Loader-г 1.5 секунд удаашруулж байна
      setTimeout(() => {
        setUpcomingMovieList(jsonData.results || []);
        setLoading(false);
      }, 1500);
    } catch (err) {
      console.error("Fetch error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(page);
  }, [page]);

  // 📄 Pagination үүсгэх функц
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (page <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (page >= totalPages - 3) {
      pages.push(
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
    }
    return pages;
  };

  // 🌀 LOADING SKELETON
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

  // 🎬 MAIN CONTENT
  return (
    <div className="w-full flex flex-col items-start px-10 gap-y-6 animate-fadeIn">
      <SectionHeader SectionTitle="Upcoming" />

      {/* Posters */}
      <div className="w-full max-w-[2100px] mx-auto grid grid-cols-5 gap-[60px] justify-items-center">
        {upcomingMovieList.map((movie, index) => (
          <div
            key={movie.id || index}
            onClick={() => router.push(`/movie-details/${movie.id}`)}
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <Poster
              posterImage={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              posterTitle={movie.title}
              rating={movie.vote_average.toFixed(1)}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center w-full mt-10 gap-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {getPageNumbers().map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-3">
              ...
            </span>
          ) : (
            <button
              key={`page-${p}`}
              onClick={() => setPage(p)}
              className={`px-4 py-2 border rounded-lg transition-all duration-200 ${
                page === p
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white hover:bg-gray-100 border-gray-300"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};
