"use client";
import { useParams } from "next/navigation";

import { Genredetails } from "./genre-details";
import { Footer } from "@/app/_features/footer";
import { Header } from "@/app/_features/Header";

export default function Genrepage() {
  const params = useParams();

  return (
    <div className=" dark:bg-black min-h-screen">
      <Header />
      <Genredetails genreId={params?.id} />
      \
      <Footer />
    </div>
  );
}
