"use client";
import { useEffect, useState } from "react";
import { Poster } from "../_components/Poster";
import { SectionHeader } from "../_components/SectionHeader";

const apilink =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const TopRatedMovieList02 = () => {
  const [TopRatedMovieList02, setTopRatedMovieList02] = useState([]);
  const [loading, setLouding] = useState(false);
  const [page, setPage] = useState(1);
  const totalPages = 73;
  const getData = async (pageNum) => {
    setLouding(true);
    try {
      const data = await fetch(apilink + pageNum, options);
      const jsonData = await data.json();
      setTopRatedMovieList02(jsonData.results);
      setLouding(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setLouding(false);
    }
  };

  useEffect(() => {
    getData(page);
  }, [page]);
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 4) {
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
    }
    return pages;
  };
  if (loading) {
    return (
      <div className="w-[1277px] flex flex-col gap-[32px]">
        <div className="flex justify-between w-full h-8">
          <div className="bg-[#F4F4F5] w-[250px] rounded-2xl"></div>
          <div className="bg-[#F4F4F5] w-[165px] rounded-2xl"></div>
        </div>
        <div className="[w-1277px] flex flex-wrap gap-8">
          {Array.from({ length: 10 }).map((_, i) => {
            <div
              key={i}
              className="bg-[#F4F4F5] w-[229px]h-[439px] rounded-lg"
            ></div>;
          })}
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col items-start px-10 ">
      <SectionHeader SectionTitle="Toprated" />

      <div className="w-full max-w-[2100px] mx-auto grid grid-cols-5 gap-[60px] justify-items-center">
        {TopRatedMovieList02.map((movie, index) => (
          <Poster
            key={index}
            posterImage={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            posterTitle={movie.title}
            rating={movie.vote_average.toFixed(1)}
          />
        ))}
      </div>
      <div className="flex justify-end items-center w-full mt-6 gap-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          Previous
        </button>

        {getPageNumbers().map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={`page-${p}`}
              onClick={() => setPage(p)}
              className={`px-3 py-1 border rounded ${
                page === p
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
