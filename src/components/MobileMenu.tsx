import React from "react";
import Image from "next/image";
import { divStyling } from "@/app/functions/DivStyling";

export interface IMobileMenuProps {
  firstIcon: string;
  secondIcon: string;
  thirdIcon: string;
  firstCol: string;
  secondCol: string;
  thirdCol: string;
  activeCol?: string;
  setActiveCol?: React.Dispatch<React.SetStateAction<string>>;
}

function MobileMenu({
  firstIcon,
  secondIcon,
  thirdIcon,
  activeCol,
  firstCol,
  secondCol,
  thirdCol,
  setActiveCol,
}: IMobileMenuProps) {
  return (
    <div className={`xl:hidden h-16 mb flex mb-2 ${divStyling}`}>
      <div
        className={`basis-1/3 border-r-2 border-slate-800 flex justify-center items-center rounded-l-md ${
          activeCol == firstCol && "bg-slate-800"
        }`}
        onClick={() => setActiveCol!(firstCol)}
      >
        <Image
          src={firstIcon}
          priority
          height={0}
          width={0}
          style={{ width: "auto", height: "35px" }}
          alt="Picture of the author"
          className=""
        />
      </div>
      <div
        className={`basis-1/3 border-r-2 border-slate-800 flex justify-center items-center ${
          activeCol == secondCol && "bg-slate-800"
        }`}
        onClick={() => setActiveCol!(secondCol)}
      >
        <Image
          src={secondIcon}
          priority
          height={0}
          width={0}
          style={{ width: "auto", height: "35px" }}
          alt="Picture of the author"
          className=""
        />
      </div>
      <div
        className={`basis-1/3 flex justify-center items-center rounded-r-md ${
          activeCol == thirdCol && "bg-slate-800"
        }`}
        onClick={() => setActiveCol!(thirdCol)}
      >
        <Image
          src={thirdIcon}
          priority
          height={0}
          width={0}
          style={{ width: "auto", height: "35px" }}
          alt="Picture of the author"
          className=""
        />
      </div>
    </div>
  );
}

export default MobileMenu;
