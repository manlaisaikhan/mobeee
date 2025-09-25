import { RigthIcons } from "../icons/rigthicon";

export const SectionHeader = ({ SectionTitle }) => {
  return (
    <div className="w-full flex items-center font-bold text-xl justify-between mb-4 px-11">
      <span>{SectionTitle}</span>
      <button className="flex items-center text-xs gap-1">
        <span>See more</span>
        <RigthIcons />
      </button>
    </div>
  );
};
