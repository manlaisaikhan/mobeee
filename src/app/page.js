"use client";
import { useEffect, useState } from "react";

import { HeroSection } from "./_components/HeroSection";
import { MovieList } from "./_components/MovieList";
import { Footer } from "./_components/footer";
import { UpcomingMovieList } from "./_components/MovieList";
import { PopularMovieList } from "./_components/Popularmovielist";
import { TopRatedMovieList } from "./_components/TopratedMovieList";
import { Header } from "./_components/Header";

const apilink =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export default function Home() {
  const [count, setcount] = useState(0);

  const getData = async () => {
    try {
      const data = await fetch(apilink, options);
      const jsonData = await data.json();
      console.log("this is data1", jsonData);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-[1440px] m-auto h-screen z-1">
      <div className="flex flex-col gap-[24px]">
        <Header />
        <HeroSection />
        <UpcomingMovieList />
        <PopularMovieList />
        <TopRatedMovieList />
        <Footer />
      </div>
    </div>
  );
}
