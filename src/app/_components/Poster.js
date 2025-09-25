import { JijegOd } from "../icons/jijegod";

export const Poster = (props) => {
  const { posterImage, posterTitle, rating } = props;
  return (
    <div className=" grid w-[229px] h-[439px] rounded-md bg-gray-400   overflow-hidden ">
      <img
        src={posterImage}
        className=" grid w-full h-[340px]  object-cover "
      />

      <div className="flex  flex-col  ">
        <div className="flex items-center gap-1">
          <JijegOd />
          <span className=" flex text-xs">
            {rating}/<span className="  text-gray-700">10</span>
          </span>
        </div>
        <div>
          <p className="text-lg">{posterTitle}</p>
        </div>
      </div>
    </div>
  );
};
