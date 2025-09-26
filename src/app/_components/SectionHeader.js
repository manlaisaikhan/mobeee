import { RigthIcons } from "../icons/rigthicon";
import Link from "next/link";

export const SectionHeader = ({ SectionTitle, seeMoreLink = "/" }) => {
  return (
    <div className="w-full flex items-center font-bold text-xl justify-between mb-4 px-11">
      <span>{SectionTitle}</span>
      <Link
        href={seeMoreLink}
        className="flex items-center text-xs gap-1 hover:underline"
      >
        <span>See more</span>
        <RigthIcons />
      </Link>
    </div>
  );
};
