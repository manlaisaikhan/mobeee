"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { GenreMovieCard } from "./genremoviecards";
import { FaAngleDown } from "react-icons/fa";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const Genredetails = () => {
  const { id } = useParams();
  const [genreMovies, setGenreMovies] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const totalPages = Math.ceil(totalResults / 20);

  const getGenreMovies = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${id}&page=${page}`,
        options
      );
      const data = await res.json();
      setGenreMovies(data.results || []);
      setTotalResults(data.total_results || 0);

      // 🕒 1.5 секунд spinner хадгалах delay
      setTimeout(() => setLoading(false), 1500);
    } catch (err) {
      console.error("❌ Genre movies fetch error:", err);
      setLoading(false);
    }
  };

  const getGenresList = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        options
      );
      const data = await res.json();
      setGenresList(data.genres || []);
    } catch (err) {
      console.error("❌ Genre list fetch error:", err);
    }
  };

  useEffect(() => {
    getGenresList();
  }, []);

  useEffect(() => {
    getGenreMovies();
  }, [id, page]);

  const genreName =
    genresList.find((g) => g.id === parseInt(id))?.name || "Unknown";

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-white rounded-full"></div>
          <p className="text-lg font-semibold animate-pulse">
            tor huleeedee broooo!!!!!!...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[1280px] flex flex-col gap-[32px] mt-[52px] mb-[32px]">
      <p className="dark:bg-black text-[30px] font-semibold">Search Filter</p>

      <div className="flex flex-row justify-between">
        {/* Sidebar */}
        <div className="flex flex-col gap-[20px]">
          <div>
            <p className="text-[24px] font-semibold">Genres</p>
            <p className="text-[16px] font-[300]">
              See lists of movies by genre
            </p>
          </div>

          <div className="flex flex-wrap w-[378px] gap-[16px]">
            {genresList.map((g) => (
              <div className="h-[20px]" key={g.id}>
                <Link href={`/Genredetails/${g.id}`}>
                  <button
                    className="min-w-[64px] h-[20px] text-[12px]
                    font-semibold flex flex-row border justify-center
                    items-center cursor-pointer rounded-[20px] gap-[8px] pr-[5px] pl-[10px]
                    border-zinc-500 hover:bg-zinc-100 transition"
                  >
                    {g.name}
                    <FaAngleDown />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[1px] bg-zinc-300"></div>

        <div className="flex flex-col gap-[32px] items-center">
          <p className="text-[20px] font-semibold">
            {totalResults} titles in “{genreName}”
          </p>

          <div className="w-[806px] flex flex-wrap justify-center gap-[48px]">
            {genreMovies.length > 0 ? (
              genreMovies.map((movie) => (
                <GenreMovieCard
                  key={movie.id}
                  title={movie.title}
                  rating={movie.vote_average?.toFixed(1)}
                  imageSrc={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/no-image.png"
                  }
                  upcomingMovieId={movie.id}
                />
              ))
            ) : (
              <p className="text-gray-500 text-[14px]">No movies found.</p>
            )}
          </div>

          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded hover:bg-zinc-100 disabled:opacity-40"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                const pageNumber = i + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={`px-3 py-1 border rounded ${
                      pageNumber === page
                        ? "bg-black text-white"
                        : "hover:bg-zinc-100"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              {totalPages > 5 && <span>…</span>}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 border rounded hover:bg-zinc-100 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
