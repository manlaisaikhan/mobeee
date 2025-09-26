import { FilmIcons } from "../icons/filmIcons";
import { GmailIcons } from "../icons/gmailicon";
import { IphoneIcon } from "../icons/iphoneicon";
import { MovieIcon } from "../icons/movieicon";

export const Footer = () => {
  return (
    <div className="w-full h-[280px] bg-indigo-700 flex justify-between items-start px-20 py-10  text-white">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 font-bold text-lg">
          <FilmIcons />
          <MovieIcon />
        </div>
        <p className="text-sm text-gray-200">
          © 2024 Movie Z. All Rights Reserved.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Contact Information</h3>
        <div className="flex items-center gap-2 text-sm">
          <GmailIcons />
          <div className="flex flex-col">
            <span className=" font-semibold">Email:</span>
            <span>support@movieZ.com</span>
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <IphoneIcon />
          <div className="flex flex-col">
            <span className="font-semibold">Phone:</span>
            <span>+976 (11) 123-4567</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Follow us</h3>
        <div className="flex gap-4 text-sm">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
          <a href="#">Youtube</a>
        </div>
      </div>
    </div>
  );
};
