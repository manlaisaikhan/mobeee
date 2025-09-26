import { JijegOd } from "../icons/jijegod";

export const Poster = (props) => {
  const { posterImage, posterTitle, rating } = props;
  return (
    <div className=" grid w-[229px] h-[439px] rounded-md bg-gray-100   overflow-hidden ">
      <img
        src={posterImage}
        className=" grid w-full h-[340px]  object-cover "
      />

      <div className="flex  flex-col  ">
        <div className="flex items-center gap-1">
          <JijegOd />
          <span className=" flex text-xs ">
            {rating}/<span className="  text-black-300">10</span>
          </span>
        </div>
        <div>
          <p className=" flex p-1/2 left-1 text-lg">{posterTitle}</p>
        </div>
      </div>
    </div>
  );
};
