import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ellipsisStyling } from "@/app/functions/EllipsisStyling";

export interface ILeagueButton {
  ID: number;
  logo: string;
  name: string;
  type: "League" | "Cup";
}

export interface ICountry {
  name: string;
  flag: string;
  leagues: ILeagueButton[];
}

export function CompetitionBtn(props: ILeagueButton) {
  return (
    <Link
      className={
        "animate-fade-in flex py-1 px-3 rounded-md hover:bg-slate-800 cursor-pointer transform transition-all duration-500 ease-out"
      }
      href={props.type != "Cup" ? "/league?id=" + props.ID : ""}
    >
      {props.logo && (
        <Image
          src={props.logo}
          height={100}
          width={100}
          style={{ width: "30px", height: "30px" }}
          alt="Picture of the author"
          className="bg-white rounded-md mr-3"
        />
      )}
      <span className={ellipsisStyling}>{props.name}</span>
    </Link>
  );
}
