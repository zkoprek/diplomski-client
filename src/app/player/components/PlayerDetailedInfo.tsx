import React, { useEffect, useState } from "react";
import Image from "next/image";
import socket from "@/app/functions/Socket";
import { divStyling } from "@/app/functions/DivStyling";
import { ellipsisStyling } from "@/app/functions/EllipsisStyling";

export interface IPlayerDetailedInfo {
  teamName: string;
  teamLogo: string;
  countryName: string;
  countryFlag: string;
  leagueName: string;
  leagueLogo: string;
  appearences: number;
  lineups: number;
  minutes: number;
  position: string;
  rating: string;
  goals: number;
  assists: number;
  conceded: number;
  saves: number;
  yellowCards: number;
  redCards: number;
  penaltyGoals: number;
}

interface IPlayerDetailedInfoProps {
  clickedSeason: string;
}

function PlayerDetailedInfo({
  clickedSeason,
}: IPlayerDetailedInfoProps) {
  const [playerDetailedInfo, setPlayerDetailedInfo] =
    useState<IPlayerDetailedInfo[]>();

  useEffect(() => {
    socket.emit("get_player_detailed_info", clickedSeason);
  }, [clickedSeason]);

  socket.on("get_player_detailed_info", (data) => {
    setPlayerDetailedInfo(data);
  });

  return playerDetailedInfo ? (
    <div className={`grow h-fit ${divStyling}`}>
      <div className="animate-fade-in h-fit flex-grow">
        <h3>Stats by Competition in Season {clickedSeason}</h3>
        <div className="flex flex-col">
          {playerDetailedInfo.map(
            (item: IPlayerDetailedInfo, index: number) => {
              return (
                <div
                  key={index}
                  className={`flex flex-col xl:mx-4 mx-2 mb-4 ${divStyling}`}
                >
                  <div className="flex xl:flex-row flex-col justify-center gap-4 px-3 p-3 border-b-2 border-slate-800">
                    <div className="flex items-center">
                      <Image
                        src={
                          item.countryFlag
                            ? item.countryFlag
                            : "https://static.flashscore.com/res/_fs/build/world.b7d16db.png"
                        }
                        width={100}
                        height={100}
                        alt="Picture of the author"
                        style={{
                          width: "50px",
                          height: "auto",
                        }}
                        className="inline mr-2"
                      />
                      <span className={ellipsisStyling}>
                        {item.countryName}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Image
                        src={
                          item.leagueLogo
                            ? item.leagueLogo
                            : "https://static.flashscore.com/res/_fs/build/world.b7d16db.png"
                        }
                        width={100}
                        height={100}
                        alt="Picture of the author"
                        style={{
                          width: "auto",
                          height: "37.5px",
                        }}
                        className="inline mr-2 p-1 rounded-md bg-white"
                      />
                      <span className={ellipsisStyling}>
                        {item.leagueName}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Image
                        src={
                          item.teamLogo
                            ? item.teamLogo
                            : "https://static.flashscore.com/res/_fs/build/world.b7d16db.png"
                        }
                        width={100}
                        height={100}
                        alt="Picture of the author"
                        style={{
                          width: "auto",
                          height: "37.5px",
                        }}
                        className="inline mr-2"
                      />
                      <span className={ellipsisStyling}>
                        {item.teamName}
                      </span>
                    </div>
                  </div>
                  <div className="flex xl:flex-row flex-col">
                    <div className="basis-1/3 xl:border-r-2 border-slate-800 p-3 flex flex-col gap-2">
                      <div>
                        <Image
                          src={"/appearences.svg"}
                          width={100}
                          height={100}
                          alt="Picture of the author"
                          style={{
                            width: "30px",
                            height: "auto",
                          }}
                          className="inline mr-2"
                        />
                        Appearences: {item.appearences}
                      </div>
                      <div>
                        <Image
                          src={"/goals.svg"}
                          width={100}
                          height={100}
                          alt="Picture of the author"
                          style={{
                            width: "30px",
                            height: "auto",
                          }}
                          className="inline mr-2"
                        />
                        Goals: {item.goals}
                      </div>
                      <div>
                        <Image
                          src={"/penalty-goals.svg"}
                          width={100}
                          height={100}
                          alt="Picture of the author"
                          style={{
                            width: "30px",
                            height: "auto",
                          }}
                          className="inline mr-2"
                        />
                        Penalty goals: {item.penaltyGoals}
                      </div>
                      <div>
                        <Image
                          src={"/assists.svg"}
                          width={100}
                          height={100}
                          alt="Picture of the author"
                          style={{
                            width: "30px",
                            height: "auto",
                          }}
                          className="inline mr-2"
                        />
                        Assists: {item.assists}
                      </div>
                    </div>
                    <div className="basis-1/3 xl:border-r-2 border-slate-800 p-3 flex flex-col gap-2">
                      <div>
                        <Image
                          src={"/lineups.svg"}
                          width={100}
                          height={100}
                          alt="Picture of the author"
                          style={{
                            width: "30px",
                            height: "auto",
                          }}
                          className="inline mr-2"
                        />
                        Lineups: {item.lineups}
                      </div>
                      <div>
                        <Image
                          src={"/minutes.svg"}
                          width={100}
                          height={100}
                          alt="Picture of the author"
                          style={{
                            width: "30px",
                            height: "auto",
                          }}
                          className="inline mr-2"
                        />
                        Minutes: {item.minutes}
                      </div>
                      <div>
                        <Image
                          src={"/position.svg"}
                          width={100}
                          height={100}
                          alt="Picture of the author"
                          style={{
                            width: "30px",
                            height: "auto",
                          }}
                          className="inline mr-2"
                        />
                        Position: {item.position}
                      </div>
                      <div>
                        <Image
                          src={"/rating.svg"}
                          width={100}
                          height={100}
                          alt="Picture of the author"
                          style={{
                            width: "30px",
                            height: "auto",
                          }}
                          className="inline mr-2"
                        />
                        Av. Rating: {item.rating}
                      </div>
                    </div>
                    <div className="basis-1/3 p-3 flex flex-col gap-2">
                      <div>
                        <Image
                          src={"/red.svg"}
                          width={100}
                          height={100}
                          alt="Picture of the author"
                          style={{
                            width: "30px",
                            height: "auto",
                          }}
                          className="inline mr-2"
                        />
                        Red: {item.redCards}
                      </div>
                      <div>
                        <Image
                          src={"/yellow.svg"}
                          width={100}
                          height={100}
                          alt="Picture of the author"
                          style={{
                            width: "30px",
                            height: "auto",
                          }}
                          className="inline mr-2"
                        />
                        Yellow: {item.yellowCards}
                      </div>
                      {item.saves && <div>Saves: {item.saves}</div>}
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className={`animate-fade-in grow h-dvh ${divStyling}`}></div>
  );
}

export default PlayerDetailedInfo;
