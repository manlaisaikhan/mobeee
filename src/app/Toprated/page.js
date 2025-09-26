"use client";

import { Footer } from "../_features/footer";
import { Header } from "../_features/Header";
import { TopRatedMovieList02 } from "../_features/TopRated02";

export default function Home() {
  return (
    <div>
      <Header />
      <TopRatedMovieList02 />
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
