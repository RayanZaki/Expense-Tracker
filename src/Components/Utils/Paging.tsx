import React from "react";
import right from "public/right-arrow.svg";
import left from "public/left-arrow.svg";
import Image from "next/image";

/**
 * This component allows to index the current Page in any list view
 */
const Paging = (Props: { size: number; max: number }) => {
  return (
    <div className="flex justify-center p-6 border-t-1 gap-4">
      {Props.size - 5 > 0 && (
        <Image src={left.src} alt={left} width={18} height={18} />
      )}
      {Props.size} / {Props.max}
      {Props.size < Props.max && (
        <Image src={right.src} alt={right} width={18} height={18} />
      )}
    </div>
  );
};

export default Paging;
