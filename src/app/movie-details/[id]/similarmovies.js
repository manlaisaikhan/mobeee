"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { StarIcons } from "@/app/icons/staricons";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsInN1YiI6IjY3OTgyZWM3NzAyZjQ5MjY3ZTliYTYzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export default function SimilarMoviesPage() {
  const { id } = useParams();
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSimilar = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
        options
      );
      const data = await res.json();
      setSimilarMovies(data.results || []);
      setLoading(false);
    };
    fetchSimilar();
  }, [id]);

  if (loading)
    return <p className="text-center text-gray-400 mt-10">Loading...</p>;

  return (
    <div className="max-w-[1440px] mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Similar Movies</h1>
      <div className="grid grid-cols-5 gap-6">
        {similarMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => router.push(`/movie/${movie.id}`)}
            className="cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-md w-full h-[320px] object-cover"
            />
            <div className="mt-2 flex items-center gap-2">
              <StarIcons className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
            <p className="text-sm font-semibold text-white truncate">
              {movie.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
