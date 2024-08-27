"use client";
import React, { useEffect, useState } from "react";
import socket from "@/app/functions/Socket";
import Image from "next/image";
import classNames from "classnames";
import { divStyling } from "@/app/functions/DivStyling";

interface IPlayerBasicInfo {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  birthDate: string;
  birthPlace: string;
  birthCountry: string;
  nationality: string;
  height: string;
  weight: string;
  injured: boolean;
  photo: string;
}

interface IPlayerBasicInfoProps {
  id: string;
  lastSeason: string;
}

function PlayerBasicInfo({ id, lastSeason }: IPlayerBasicInfoProps) {
  const [playerBasicInfo, setPlayerBasicInfo] =
    useState<IPlayerBasicInfo>();

  useEffect(() => {
    socket.emit("get_player_info", [id, lastSeason]);
  }, [id, lastSeason]);

  socket.on("get_player_info", (data) => {
    setPlayerBasicInfo(data);
  });

  const infoRowClasses = classNames(
    "border-b-2 border-slate-800 animate-fade-in"
  );

  return playerBasicInfo ? (
    <div
      className={`flex flex-col gap-4 xl:basis-1/4 w-full h-fit p-3 ${divStyling}`}
    >
      {playerBasicInfo.photo != "N/A" && (
        <div>
          <Image
            src={playerBasicInfo.photo}
            width={200}
            height={200}
            alt="Picture of the author"
            style={{ width: "100px", height: "auto" }}
            className="mx-auto my-2 rounded-xl animate-fade-in"
          />
        </div>
      )}

      <div className={infoRowClasses}>
        First name: {playerBasicInfo.firstName}
      </div>
      <div className={infoRowClasses}>
        Last name: {playerBasicInfo.lastName}
      </div>
      <div className={infoRowClasses}>Age: {playerBasicInfo.age}</div>
      <div className={infoRowClasses}>
        Birth Date: {playerBasicInfo.birthDate}
      </div>
      <div className={infoRowClasses}>
        Birth Place: {playerBasicInfo.birthPlace}
      </div>
      <div className={infoRowClasses}>
        Birth Country: {playerBasicInfo.birthCountry}
      </div>
      <div className={infoRowClasses}>
        Nationality: {playerBasicInfo.nationality}
      </div>
      <div className={infoRowClasses}>
        Height: {playerBasicInfo.height}
      </div>
      <div className={infoRowClasses}>
        Weight: {playerBasicInfo.weight}
      </div>
      <div>Injured: {playerBasicInfo.injured ? "Yes" : "No"}</div>
    </div>
  ) : (
    <div
      className={`animate-fade-in xl:basis-1/4 w-full h-[500px] ${divStyling}`}
    ></div>
  );
}

export default PlayerBasicInfo;
