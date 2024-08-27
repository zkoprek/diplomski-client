"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import socket from "../app/functions/Socket";
import classNames from "classnames";
import InfoRow from "@/app/team/components/TeamInfoRow";
import SeparatingLine from "./SeparatingLine";
import PulsatingDot from "./PulsatingDot";
import Link from "next/link";
import { divStyling } from "@/app/functions/DivStyling";

interface IGameCardProps {
  id: number;
  onClose?: React.Dispatch<React.SetStateAction<number | undefined>>;
}

interface IFixtureData {
  country: string;
  countryFlag: string;
  competition: string;
  competitionLogo: string;
  homeID: string;
  homeName: string;
  awayID: string;
  awayName: string;
  homeLogo: string;
  awayLogo: string;
  homeGoals: number;
  awayGoals: number;
  elapsed: number;
  referee: string;
  statusLong: string;
  city: string;
  venue: string;
  date: string;
  time: string;
}

interface IBettingData {
  bookmaker: string;
  homeCoef: number | "N/A";
  drawCoef: number | "N/A";
  awayCoef: number | "N/A";
}

interface IOddClasses {
  isLeft?: boolean;
  isRight?: boolean;
}

function getOddClasses({
  isLeft = false,
  isRight = false,
}: IOddClasses) {
  var betNumberClasses = classNames(
    "w-12 h-12 bg-gray-600 flex justify-center items-center",
    {
      "basis-1/3 rounded-l-lg ": isLeft,
      "basis-2/3 rounded-r-lg": isRight,
    }
  );
  return betNumberClasses;
}

function GameCard({ id, onClose }: IGameCardProps) {
  const [fixtureData, setFixtureData] = useState<IFixtureData>();
  const [bettingData, setBettingData] = useState<IBettingData[]>();
  const keywordsForNoDot = [
    "Finished",
    "Postponed",
    "Started",
    "Canceled",
  ];

  useEffect(() => {
    const emit = () => {
      socket.emit("get_fixture_info", id);
      socket.emit("get_betting_info", id);
    };
    const intervalId = setInterval(emit, 30000);
    emit();

    return () => clearInterval(intervalId);
  }, [id]);

  socket.on("get_betting_info", (data: IBettingData[]) => {
    setBettingData(data);
  });

  socket.on("get_fixture_info", (data: IFixtureData) => {
    setFixtureData(data);
  });

  return fixtureData ? (
    <div className={`basis-1/2 h-fit ${divStyling}`}>
      <div className="animate-fade-in h-fit flex flex-col items-center gap-2 border-2 px-4 py-3 border-none">
        <div className="w-full relative">
          <h2>Match Details</h2>
          {onClose && (
            <button
              className="absolute top-1 right-0"
              onClick={() => onClose(undefined)}
            >
              <Image
                src="/close.svg"
                height={100}
                width={100}
                style={{
                  width: "35px",
                  height: "35px",
                }}
                alt="Picture of the author"
                className="xl:inline mr-2 hidden"
              />
            </button>
          )}
        </div>
        <SeparatingLine />
        {fixtureData && (
          <>
            <div>
              {fixtureData.date}, {fixtureData.time}h
            </div>
            <div>
              <Image
                src={
                  fixtureData.competitionLogo
                    ? fixtureData.competitionLogo
                    : "https://static.flashscore.com/res/_fs/build/world.b7d16db.png"
                }
                height={100}
                width={100}
                style={{ width: "30px", height: "30px" }}
                alt="Picture of the author"
                className="inline mr-2 rounded-md bg-white p-1"
              />
              {fixtureData.country}, {fixtureData.competition}
            </div>
            <div className="flex justify-center gap-10 w-full mt-2">
              <Link
                href={"/team?id=" + fixtureData.homeID}
                className="w-5/12 flex flex-col gap-2 items-center text-center pt-2 rounded-md hover:bg-slate-800"
              >
                <Image
                  src={fixtureData.homeLogo}
                  width={80}
                  height={80}
                  alt="Picture of the author"
                  className="inline bg-white p-1 rounded-lg"
                />
                {fixtureData.homeName}
              </Link>
              <div className="w-2/12 flex justify-center items-center text-3xl italic">
                VS.
              </div>
              <Link
                href={"/team?id=" + fixtureData.awayID}
                className="w-5/12 flex flex-col gap-2 items-center text-center pt-2 rounded-md hover:bg-slate-800"
              >
                <Image
                  src={fixtureData.awayLogo}
                  width={80}
                  height={80}
                  alt="Picture of the author"
                  className="inline bg-white p-1 rounded-lg"
                />
                {fixtureData.awayName}
              </Link>
            </div>
            <div className="text-4xl">
              {fixtureData.homeGoals} - {fixtureData.awayGoals}
            </div>
            <div className="relative">
              {fixtureData.statusLong == "Not Started"
                ? fixtureData.statusLong
                : fixtureData.statusLong +
                  " - " +
                  fixtureData.elapsed}
              {keywordsForNoDot.every(
                (status) => !fixtureData.statusLong.includes(status)
              ) && (
                <PulsatingDot top={"top-[8px]"} right={"-right-5"} />
              )}
            </div>
            <SeparatingLine />
            <InfoRow>
              <div className="basis-1/3">Venue: </div>
              <div className="basis-2/3 text-right">
                {fixtureData.venue
                  ? fixtureData.venue + ", " + fixtureData.city
                  : "Unknown"}
              </div>
            </InfoRow>
            <InfoRow>
              <div className="basis-1/3">Referee:</div>
              <div className="basis-2/3 text-right">
                {fixtureData.referee
                  ? fixtureData.referee
                  : "Unknown"}
              </div>
            </InfoRow>
            <SeparatingLine />
            <div className="flex flex-col gap-3 w-full mt-2">
              {bettingData &&
                (bettingData[0].bookmaker == "N/A" ? (
                  <div className="text-center">No Betting Info!</div>
                ) : (
                  bettingData.map((item: IBettingData, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col w-full justify-around"
                      >
                        <div>{item.bookmaker}</div>
                        <div className="flex gap-2">
                          <div className="flex w-full gap-1 text-2xl">
                            <div
                              className={getOddClasses({
                                isLeft: true,
                              })}
                            >
                              1
                            </div>
                            <div
                              className={getOddClasses({
                                isRight: true,
                              })}
                            >
                              {item.homeCoef}
                            </div>
                          </div>
                          <div className="flex w-full gap-1 text-2xl">
                            <div
                              className={getOddClasses({
                                isLeft: true,
                              })}
                            >
                              X
                            </div>
                            <div
                              className={getOddClasses({
                                isRight: true,
                              })}
                            >
                              {item.drawCoef}
                            </div>
                          </div>
                          <div className="flex w-full gap-1 text-2xl">
                            <div
                              className={getOddClasses({
                                isLeft: true,
                              })}
                            >
                              2
                            </div>
                            <div
                              className={getOddClasses({
                                isRight: true,
                              })}
                            >
                              {item.awayCoef}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  ) : (
    <div className="basis-1/2 h-dvh rounded-xl border-2 border-slate-800 bg-matchPitchBg animate-fade-in"></div>
  );
}

export default GameCard;
