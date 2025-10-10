// src/app/movie-details/[id]/page.js
import { Header } from "@/app/_features/Header";
import { Footer } from "@/app/_features/footer";
import { MovieDetails01 } from "./components/Moviedetails";

export default function MovieDetailsPage({ params }) {
  const { id } = params;

  return (
    <div>
      <Header />
      <MovieDetails01 id={id} />

      <Footer />
    </div>
  );
}
