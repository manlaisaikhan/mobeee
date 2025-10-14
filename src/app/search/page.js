"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { JijegOd } from "@/app/icons/jijegod";
import { FaAngleDown } from "react-icons/fa";
import { Footer } from "../_features/footer";
import { Header } from "../_features/Header";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const handleMovieDetail = (movieId) => {
    router.push(`/movie-details/${movieId}`);
  };

  // 🔍 Search query-р кино татах
  useEffect(() => {
    if (!query) return;
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=${page}`,
          options
        );
        const data = await res.json();
        // 3 секундийн skeleton delay
        setTimeout(() => {
          setResults(data.results || []);
          setTotalPages(data.total_pages || 1);
          setLoading(false);
        }, 1500);
      } catch (err) {
        console.error("Search fetch error:", err);
        setLoading(false);
      }
    };
    fetchMovies();
  }, [query, page]);

  // 📜 Genres жагсаалт татах
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
          options
        );
        const data = await res.json();
        setTimeout(() => {
          setGenresList(data.genres || []);
        }, 3000);
      } catch (err) {
        console.error("Genre list fetch error:", err);
      }
    };
    fetchGenres();
  }, []);

  // 💀 Skeleton UI (placeholder)
  const MovieSkeleton = () => (
    <div className="w-[165px] h-[331px] rounded-[5px] bg-gray-300 animate-pulse"></div>
  );

  const GenreSkeleton = () => (
    <div className="w-[70px] h-[20px] bg-gray-300 rounded-[20px] animate-pulse"></div>
  );

  return (
    <>
      <Header />
      <div className="flex flex-col items-center mt-[52px] mb-[32px]">
        <div className="w-[1280px] flex flex-col gap-[32px]">
          <p className="text-[30px] font-semibold text-start">Search Filter</p>

          <div className="flex flex-row justify-center gap-[40px]">
            {/* LEFT SECTION */}
            <div className="flex flex-col gap-[32px] w-[806px]">
              <p className="text-[20px] font-semibold">
                {!loading && `${results.length} results for “${query}”`}
              </p>

              {/* MOVIE GRID */}
              <div className="flex flex-wrap gap-[48px]">
                {loading
                  ? Array.from({ length: 12 }).map((_, i) => (
                      <MovieSkeleton key={i} />
                    ))
                  : results.length > 0
                  ? results.map((movie) => (
                      <div
                        key={movie.id}
                        className="w-[165px] h-[331px] dark:bg-black rounded-[5px] flex flex-col gap-[8px] cursor-pointer hover:scale-[1.05] transition-transform duration-200"
                        onClick={() => handleMovieDetail(movie.id)}
                      >
                        <img
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                              : "/no-image.png"
                          }
                          alt={movie.title}
                          className="object-cover w-[165px] h-[244px] rounded-[5px]"
                        />
                        <div className="ml-[8px] flex flex-col gap-[5px]">
                          <p className="flex text-[14px] items-center">
                            <span className="mr-[5px]">
                              <JijegOd />
                            </span>
                            10{" "}
                            <span className="text-zinc-400 text-[13px]">
                              /{movie.vote_average?.toFixed(1) || "0.0"}
                            </span>
                          </p>
                          <p className="text-[14px] font-[350] line-clamp-2">
                            {movie.title}
                          </p>
                        </div>
                      </div>
                    ))
                  : !loading && (
                      <p className="text-gray-500 text-[14px]">
                        No results found.
                      </p>
                    )}
              </div>

              {/* 🔹 PAGINATION BUTTONS */}
              {!loading && (
                <div className="flex justify-center items-center w-full mt-6 gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
                  >
                    Previous
                  </button>

                  <span className="text-sm text-gray-600">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>

            {/* DIVIDER */}
            <div className="w-[1px] bg-zinc-300"></div>

            {/* RIGHT SIDEBAR */}
            <div className="flex flex-col gap-[20px] w-[330px]">
              <div>
                <p className="text-[24px] font-semibold">Genres</p>
                <p className="text-[16px] font-[300]">
                  See lists of movies by genre
                </p>
              </div>

              <div className="flex flex-wrap gap-[16px]">
                {loading
                  ? Array.from({ length: 10 }).map((_, i) => (
                      <GenreSkeleton key={i} />
                    ))
                  : genresList.map((g) => (
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
