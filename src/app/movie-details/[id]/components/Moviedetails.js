"use client";

import { PLayIcons } from "@/app/icons/playicons";
import { StarIcons } from "@/app/icons/staricons";
import { useEffect, useState } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const MovieDetails01 = ({ id }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    if (!id) return;

    const apiLink = `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=credits,videos`;

    const getData = async () => {
      try {
        setLoading(true);
        const res = await fetch(apiLink, options);
        const data = await res.json();

        if (data.success === false) {
          setMovie(null);
        } else {
          setMovie(data);
          const trailer = data.videos?.results?.find(
            (vid) => vid.type === "Trailer"
          );
          if (trailer) setTrailerKey(trailer.key);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  if (loading)
    return (
      <div className="p-6 text-center text-lg font-semibold text-gray-500">
        Loading...
      </div>
    );

  if (!movie)
    return (
      <div className="p-6 text-red-600 text-center text-lg">
        Movie not found.
      </div>
    );

  // --- Crew / Cast info ---
  const crew = movie.credits?.crew || [];
  const cast = movie.credits?.cast || [];

  const directors = crew.filter((c) => c.job === "Director").map((c) => c.name);

  const writers = crew
    .filter(
      (c) =>
        c.department === "Writing" ||
        ["Writer", "Screenplay", "Story", "Novel", "Teleplay"].includes(c.job)
    )
    .map((c) => c.name)
    .slice(0, 3);

  const stars = [...cast]
    .sort((a, b) => a.order - b.order)
    .slice(0, 3)
    .map((c) => c.name);

  const sortedGenres = (movie.genres || []).slice().sort((a, b) => a.id - b.id);

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto h-auto items-center dark:bg-black py-10 px-10 gap-8">
      {/* HEADER */}
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <p className="text-[36px] font-bold">{movie.title}</p>
          <p className="text-[18px] text-gray-400">
            {movie.release_date} • {movie.runtime}m
          </p>
        </div>

        <div className="flex flex-col items-end">
          <h3 className="text-lg font-semibold">Rating</h3>
          <div className="flex gap-1 items-center">
            <StarIcons />
            <span className="text-lg font-medium">{movie.vote_average}</span>
            <span className="text-lg font-medium">/10</span>
          </div>
          <p className="text-sm text-gray-400">{movie.vote_count} votes</p>
        </div>
      </div>

      {/* POSTER + BACKDROP */}
      <div className="flex flex-row gap-10 relative items-start">
        {/* Poster */}
        <img
          className="w-[300px] h-[428px] object-cover rounded-lg shadow-md"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        {/* Backdrop */}
        <div
          className="relative w-[788px] h-[428px] rounded-lg overflow-hidden shadow-lg"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w780${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

          {/* Trailer Button */}
          {trailerKey && (
            <button
              onClick={() => setShowTrailer(true)}
              className="absolute bottom-5 left-5 flex items-center justify-start transition rounded-lg px-5 py-3 gap-3 bg-black/50 hover:bg-black/70"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center shrink-0">
                <PLayIcons className="text-black w-5 h-5" />
              </div>
              <span className="text-white font-bold leading-none">
                Play Trailer
              </span>
            </button>
          )}

          {/* Text Overlay */}
          <div className="absolute left-5 top-5 max-w-[60%]">
            <h2 className="text-2xl font-bold drop-shadow text-white">
              {movie.title}
            </h2>
            <p className="text-sm mt-1 text-white/80">{movie.tagline}</p>
          </div>
        </div>
      </div>

      {/* GENRES */}
      <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-2 flex-wrap">
          {sortedGenres.map((genre) => (
            <button
              key={genre.id}
              className="h-7 flex items-center justify-start gap-2 px-4 cursor-pointer text-sm font-bold border rounded-full border-gray-300"
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW */}
      <p className="w-full leading-relaxed text-gray-300">{movie.overview}</p>

      {/* CREW INFO */}
      <div className="flex flex-col gap-6 w-full text-gray-200">
        <div className="text-base border-b border-[#333] py-2 font-bold flex gap-4">
          Director:
          <p className="font-normal">
            {directors.length ? directors.join(", ") : "-"}
          </p>
        </div>
        <div className="text-base border-b border-[#333] py-2 font-bold flex gap-4">
          Writers:
          <p className="font-normal">
            {writers.length ? writers.join(", ") : "-"}
          </p>
        </div>
        <div className="text-base border-b border-[#333] py-2 font-bold flex gap-4">
          Stars:
          <p className="font-normal">{stars.length ? stars.join(", ") : "-"}</p>
        </div>
      </div>

      {/* TRAILER MODAL */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-black rounded-xl p-4 relative w-[800px] h-[500px] shadow-lg">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-2 right-2 text-white px-3 py-1 rounded hover:bg-gray-800"
            >
              ✕
            </button>
            {trailerKey ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <p className="text-white text-center mt-10">
                No trailer available
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
