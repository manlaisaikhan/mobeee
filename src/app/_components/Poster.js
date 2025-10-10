"use client";

import { useRouter } from "next/navigation";
import { JijegOd } from "../icons/jijegod";

export const Poster = (props) => {
  const { posterImage, posterTitle, rating, movieId } = props;
  const router = useRouter();

  const handleMovieClick = () => {
    router.push(`/movie-details/${movieId}`);
  };

  return (
    <div
      className="grid w-[229px] h-[439px] rounded-md bg-gray-100 overflow-hidden cursor-pointer dark:bg-black"
      onClick={handleMovieClick}
    >
      <img
        src={posterImage}
        alt={posterTitle}
        className="w-full h-[340px] object-cover"
      />

      <div className="flex flex-col p-2">
        <div className="flex items-center gap-1">
          <JijegOd />
          <span className="text-xs">
            {rating}/<span className="text-gray-500">10</span>
          </span>
        </div>
        <div>
          <p className="text-lg">{posterTitle}</p>
        </div>
      </div>
    </div>
  );
};
