"use client";
import { JijegOd } from "@/app/icons/jijegod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const GenreMovieCard = (props) => {
  const { title, rating, imageSrc, upcomingMovieId } = props;
  const [loading, setLoading] = useState(true); // 🆕 loading state

  const router = useRouter();

  const handleMovieDetail = () => {
    router.push(`/movie-details/${upcomingMovieId}`);
  };

  // 🆕 Зураг ачаалсны дараа loading-г false болгоно
  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => setLoading(false);
    img.onerror = () => setLoading(false);
    setTimeout(() => setLoading(false), 2000); // 2 секунд
  }, [imageSrc]);

  return (
    <div className="w-[165px] h-[331px] dark:bg-black rounded-[5px] flex flex-col gap-[8px] relative">
      {loading ? (
        // 🌀 LOADING SPINNER
        <div className="flex items-center justify-center w-[165px] h-[244px] bg-zinc-900 rounded-[5px]">
          <div className="w-8 h-8 border-4 border-gray-400 border-t-white rounded-full "></div>
        </div>
      ) : (
        // 🖼️ IMAGE
        <button className="cursor-pointer" onClick={handleMovieDetail}>
          <img
            src={imageSrc}
            alt="Image Not Found"
            className="object-cover w-[165px] h-[244px] rounded-[5px]"
          />
        </button>
      )}

      <div className="ml-[8px] flex flex-col gap-[5px]">
        <p className="flex text-[14px] dark:bg-black items-center">
          <span className="mr-[5px]">
            <JijegOd />
          </span>
          10 <span className="text-zinc-400 text-[13px]">/{rating}</span>
        </p>
        <p className="dark:bg-black text-[14px] font-[350]">{title}</p>
      </div>
    </div>
  );
};
