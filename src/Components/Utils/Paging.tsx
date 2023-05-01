import React, { MouseEventHandler, useState } from "react";
import right from "public/right-arrow.svg";
import left from "public/left-arrow.svg";
import Image from "next/image";

/**
 * This component allows to index the current Page in any list view
 */
const Paging = (Props: {
  size: number;
  max: number;
  pos: { pos: number; setter: Function };
}) => {
  let current: number;

  if ( Props.size === 0 )
    current = 0;
  else {
 current =
    Props.size % 5 == 0 ? Props.pos.pos + 5 : Props.pos.pos + Props.size;
  }
  const goBack = () => {
    Props.pos.setter(Props.pos.pos - 5);
  };
  const goForward = () => {
    Props.pos.setter(Props.pos.pos + 5);
  };
  return (
    <div className="flex justify-center p-6 border-t-1 gap-4">
      {current > 5 && (
        <Image
          className={"hover:cursor-pointer"}
          src={left.src}
          alt={left}
          width={18}
          height={18}
          onClick={goBack}
        />
      )}
      {current} / {Props.max}
      {current < Props.max && (
        <Image
          className={"hover:cursor-pointer"}
          src={right.src}
          alt={right}
          width={18}
          height={18}
          onClick={goForward}
        />
      )}
    </div>
  );
};

export default Paging;
