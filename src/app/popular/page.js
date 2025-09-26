"use client";

import { PopularMovieList02 } from "@/app/_features/Popular02";
import { Footer } from "../_features/footer";
import { Header } from "../_features/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <PopularMovieList02 />
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
