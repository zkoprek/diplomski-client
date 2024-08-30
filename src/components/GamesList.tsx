"use client";
import React from "react";
import Image from "next/image";
import { ILiveGame } from "./LiveGames";
import PulsatingDot from "./PulsatingDot";
import { ellipsisStyling } from "@/app/functions/EllipsisStyling";

interface GamesListProps {
  content: ILiveGame[];
  setChosenMatchID?: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  isHistory?: boolean;
  isLive?: boolean;
  isFuture?: boolean;
  setActiveCol?: React.Dispatch<React.SetStateAction<string>>;
}

function GamesList({
  content,
  setChosenMatchID,
  isHistory = false,
  isLive = false,
  isFuture = false,
  setActiveCol,
}: GamesListProps) {
  const handleGameClick = (id: number) => {
    if (setChosenMatchID) {
      setChosenMatchID(undefined);
      setChosenMatchID(id);
    }
    if (setActiveCol) setActiveCol("details");
  };

  console.log(content.length);

  return (
    <div className="xl:mx-4 mb-4">
      <hr className="h-[2px] border-none bg-slate-800 mx-3 xl:mx-0" />
      {content.length > 0 ? (
        content.map((item: ILiveGame, index) => {
          return (
            <div
              key={index}
              className={`cursor-pointer animate-fade-in ${
                item.competition == "Same" ? "" : "mt-3"
              }`}
            >
              <div className="flex flex-col my-1">
                {item.competition != "Same" && (
                  <div className="flex py-1 px-3 w-full">
                    <div>
                      <Image
                        src={
                          item.countryFlag
                            ? item.countryFlag
                            : "https://static.flashscore.com/res/_fs/build/world.b7d16db.png"
                        }
                        height={100}
                        width={100}
                        style={{
                          width: "25px",
                          height: "25px",
                        }}
                        alt="Picture of the author"
                        className="inline mr-2"
                      />
                      <span className="my-auto">
                        {item.country} - {item.competition}
                      </span>
                    </div>
                  </div>
                )}
                <div
                  className="flex py-1 px-3 rounded-md hover:bg-slate-800"
                  onClick={() => handleGameClick(item.id)}
                >
                  <div className="w-1/2 flex flex-col">
                    <div className={ellipsisStyling}>
                      {item.homeTeam}
                    </div>
                    <div className={ellipsisStyling}>
                      {item.awayTeam}
                    </div>
                  </div>
                  <div className="basis-1/5 flex flex-col items-end">
                    <div className="w-5 text-center">
                      {item.goalsHome}
                    </div>
                    <div className="w-5 text-center">
                      {item.goalsAway}
                    </div>
                  </div>
                  {isHistory && (
                    <div className="grow flex flex-col items-end">
                      <div className="w-full text-right">
                        {item.date}
                      </div>
                      <div className="w-16 text-right">
                        {item.time}
                      </div>
                    </div>
                  )}
                  {isFuture && (
                    <div className="grow flex flex-col items-end">
                      <div className="w-full text-right">
                        {item.date}
                      </div>
                      <div className="w-16 text-right">
                        {item.time}
                      </div>
                    </div>
                  )}
                  {isLive && (
                    <div className="grow flex flex-col items-end">
                      <div className="w-16 text-center">
                        {item.statusShort}
                      </div>
                      <div className="w-16 text-center relative">
                        {item.elapsed} min
                        <PulsatingDot
                          top={"-top-[20px]"}
                          right={"right-0"}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center mt-4">No data!</div>
      )}
    </div>
  );
}

export default GamesList;
