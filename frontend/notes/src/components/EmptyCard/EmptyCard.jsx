import React from "react";

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <img src={imgSrc} alt="No notes" className="w-60 mt-10" />
      <h3 className="w-1/2 text-3xl font-bigShoulders font-medium text-black text-center leading-14 tracking-100 mt-20 dark:text-primary ">
        {message}
      </h3>
    </div>
  );
};

export default EmptyCard;
