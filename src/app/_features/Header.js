import { ButtonIcon } from "../icons/buttonicon";
import { DownIcons } from "../icons/downicons";
import { FileIcons } from "../icons/fileicons";
import { Moveblue } from "../icons/movieblue";

import { SearchIcons } from "../icons/searchicons";

export const Header = () => {
  return (
    <div className="flex w-full justify-between px-20 items-center">
      <div className=" flex justify-center items-center gap-2">
        <FileIcons />
        <Moveblue />
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center border gap-2 rounded-lg px-4">
          <DownIcons />
          <p className="text-sm">Genre</p>
        </button>
        <div className="flex placeholder:text-gray-500 items-center gap-2 border rounded-lg px-4">
          <SearchIcons />
          <input placeholder="Search" type="text" name="search" />
        </div>
      </div>
      <div className="flex items-center w-[36px] h-[36px] border border-gray-500 rounded-md justify-center">
        <ButtonIcon />
      </div>
    </div>
  );
};
