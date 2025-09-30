"use client";

import { Pagination } from "../_components/Pagination";
import { Footer } from "../_features/footer";
import { Header } from "../_features/Header";

import { UpcomingMovieList02 } from "../_features/Upcoming02";

export default function Home() {
  return (
    <div>
      <Header />
      <UpcomingMovieList02 />

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
