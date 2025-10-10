// "use client";
// import { JijegOd } from "@/app/icons/jijegod";
// import { useRouter } from "next/navigation";

// export const GenreMovieCard = (props) => {
//   const { title, rating, imageSrc, upcomingMovieId } = props;

//   const router = useRouter();

//   const handleMovieDetail = () => {
//     router.push(`/movie-details/${upcomingMovieId}`);
//   };

//   return (
//     <div className="w-[165px] h-[331px] dark:bg-black rounded-[5px] flex flex-col gap-[8px]">
//       <button className="cursor-pointer" onClick={handleMovieDetail}>
//         <img
//           src={imageSrc}
//           alt="Image Not Found"
//           className="object-cover w-[165px] h-[244px] rounded-[5px]"
//         />
//       </button>
//       <div className="ml-[8px] flex flex-col gap-[5px]">
//         <p className="flex text-[14px] dark:bg-black items-center">
//           <span className="mr-[5px]">
//             <JijegOd />
//           </span>
//           10 <span className="text-zinc-400 text-[13px]">/{rating}</span>
//         </p>
//         <p className=" dark:bg-black text-[14px] font-[350]">{title}</p>
//       </div>
//     </div>
//   );
// };
