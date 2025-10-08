"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Footer } from "../_features/footer";
import { Header } from "../_features/Header";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
            },
          }
        );
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [query]);

  return (
    <>
      <Header />

      <div className="min-h-screen p-8 bg-white text-black">
        <h1 className="text-2xl font-bold mb-6">
          Search results for: <span className="text-blue-600">{query}</span>
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {results.map((movie) => (
              <a
                key={movie.id}
                href={`/movie-details/${movie.id}`}
                className="hover:scale-105 transition-transform"
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  alt={movie.title}
                  className="rounded-lg"
                />
                <p className="mt-2 text-sm font-medium text-center">
                  {movie.title}
                </p>
              </a>
            ))}
          </div>
        ) : (
          <p>No results found for "{query}"</p>
        )}
      </div>
      <Footer />
    </>
  );
}
