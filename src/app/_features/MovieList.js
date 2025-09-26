"use client";
import { useEffect, useState } from "react";

import { Poster } from "../_components/Poster";
import { SectionHeader } from "../_components/SectionHeader";

const apilink =
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const UpcomingMovieList = () => {
  const [upcomingMovieList, setUpcomingMovieList] = useState([]);
  const [loading, setLouding] = useState(false);
  const getData = async () => {
    setLouding(true);
    try {
      const data = await fetch(apilink, options);
      const jsonData = await data.json();
      setUpcomingMovieList(jsonData.results.splice(10));
      setLouding(false);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
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
      <SectionHeader SectionTitle={"Upcoming"} />

      <div className=" grid grid-cols-5  gap-[60px] ">
        {upcomingMovieList.map((movie, index) => (
          <Poster
            key={index}
            posterImage={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            posterTitle={movie.title}
            rating={movie.vote_average.toFixed(1)}
          />
        ))}
      </div>
    </div>
  );
};
