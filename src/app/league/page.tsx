"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import socket from "@/app/functions/Socket";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import TeamForm from "./components/TeamForm";
import Rank from "./components/Rank";
import Link from "next/link";
import Footer from "@/components/Footer";
import { ellipsisStyling } from "../functions/EllipsisStyling";

interface ILeague {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  standings: ITeam[];
}

interface ITeam {
  id: number;
  name: string;
  rank: number;
  logo: string;
  points: number;
  goalsDiff: number;
  form: string[];
  description: string;
  played: number;
  win: number;
  draw: number;
  lose: number;
  goalsFor: number;
  goalsAgainst: number;
}

function Page() {
  const determineInitialWidth = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 1280) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleResize = () => {
    if (window.innerWidth < 1280) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const [leagueData, setLeagueData] = useState<ILeague>();
  const searchParams = useSearchParams();
  const [seasonSelected, setSeasonSelected] = useState<number>(2024);
  const [availableSeasons, setAvailableSeasons] =
    useState<number[]>();
  const selectSeasonRef = useRef<HTMLSelectElement>(null);

  const [isMobile, setIsMobile] = useState<boolean>(
    !determineInitialWidth()
  );

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  const leagueID = searchParams.get("id");

  useEffect(() => {
    socket.emit("get_standings", [leagueID, seasonSelected]);
  }, [seasonSelected, leagueID]);

  const handleSeasonSelect = () => {
    setSeasonSelected(parseInt(selectSeasonRef.current!.value));
  };

  socket.on("get_standings", (data: ILeague) => {
    setLeagueData(data);

    var yearsArray: number[] = [];
    for (var i = 2024; i > 2010; i--) {
      yearsArray.push(i);
    }
    setAvailableSeasons(yearsArray);
  });

  return (
    <div className="container xl:px-5 px-2 mx-auto min-h-dvh flex flex-col">
      <Navbar />
      <main className="grow flex justify-center">
        {leagueData && !isMobile && availableSeasons && (
          <div className="animate-fade-in flex flex-col p-4 w-fit justify-center items-center border-2 rounded-xl border-slate-800 bg-matchPitchBg">
            <div className="flex justify-center items-center">
              <Image
                src={leagueData.flag}
                height={100}
                width={100}
                style={{ width: "40px", height: "40px" }}
                alt="Picture of the author"
                className="inline mr-3"
              />
              <div className="text-3xl">
                {leagueData.country}, {leagueData.name}, Season:
                <select
                  ref={selectSeasonRef}
                  onChange={handleSeasonSelect}
                  className="ml-2 outline-none p-1"
                >
                  {availableSeasons.map((year: number, index) => {
                    return (
                      <option key={index} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
                <Image
                  src="/down-arrow.svg"
                  height={100}
                  width={100}
                  style={{ width: "40px", height: "40px" }}
                  alt="Picture of the author"
                  className="inline mr-3"
                />
              </div>
            </div>
            <div className="w-fit">
              <div className="flex mt-4 py-1 px-[6px]">
                <div className="w-8 mr-3 text-center">#</div>
                <div className="mr-3" style={{ width: "25px" }}></div>
                <div className="w-72 text-left">Team</div>
                <div className="w-14 text-center">P</div>
                <div className="w-8 text-center">W</div>
                <div className="w-8 text-center">D</div>
                <div className="w-8 text-center">L</div>
                <div className="w-24 text-center">Goals</div>
                <div className="w-8">Diff</div>
                <div className="w-52 text-center">Last 5</div>
                <div className="w-8">Pts</div>
              </div>
              {leagueData.standings.map((row: ITeam, index) => {
                return (
                  <Link
                    key={index}
                    href={"/team?id=" + row.id}
                    className="flex hover:bg-slate-800 py-[6px] px-[6px] rounded-lg items-center"
                  >
                    <Rank
                      rank={row.rank}
                      description={row.description}
                    />
                    <div>
                      <Image
                        src={row.logo}
                        height={100}
                        width={100}
                        style={{ width: "25px", height: "25px" }}
                        alt="Picture of the author"
                        className="inline mr-3"
                      />
                    </div>
                    <div className={`w-72 ${ellipsisStyling}`}>
                      {row.name}
                    </div>
                    <div className="w-14 text-center">
                      {row.played}
                    </div>
                    <div className="w-8 text-center">{row.win}</div>
                    <div className="w-8 text-center">{row.draw}</div>
                    <div className="w-8 text-center">{row.lose}</div>
                    <div className="w-24 text-center">
                      {row.goalsFor}:{row.goalsAgainst}
                    </div>
                    <div className="w-8 text-center">
                      {row.goalsDiff}
                    </div>
                    {row.form[0] && <TeamForm form={row.form} />}
                    <div className="w-8 text-center">
                      {row.points}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
        {leagueData && isMobile && availableSeasons && (
          <div className="animate-fade-in flex flex-col py-2 w-full justify-center items-center border-2 rounded-xl border-slate-800 bg-matchPitchBg">
            <div className="flex w-full justify-center items-center">
              <Image
                src={leagueData.flag}
                height={100}
                width={100}
                style={{ width: "30px", height: "30px" }}
                alt="Picture of the author"
                className="mx-4"
              />
              <div className="flex flex-col w-full">
                <div>{leagueData.name}</div>
                <div>
                  Season:
                  <select
                    ref={selectSeasonRef}
                    onChange={handleSeasonSelect}
                    className="ml-2 outline-none p-1"
                  >
                    {availableSeasons.map((year: number, index) => {
                      return (
                        <option key={index} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                  <Image
                    src="/down-arrow.svg"
                    height={100}
                    width={100}
                    style={{ width: "30px", height: "30px" }}
                    alt="Picture of the author"
                    className="inline mr-3"
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="flex mt-4 py-1 px-[6px] w-full">
                <div className="w-8 mr-2 text-center">#</div>
                <div className="flex w-full justify-around">
                  <div
                    className="mr-3"
                    style={{ width: "25px" }}
                  ></div>
                  <div className="w-32 text-left">Team</div>
                  <div className="w-10 text-center">P</div>
                  <div className="w-10 text-center">+/-</div>
                  <div className="w-10 text-center">Pts</div>
                </div>
              </div>
              {leagueData.standings.map((row: ITeam, index) => {
                return (
                  <div
                    key={index}
                    className="flex hover:bg-slate-800 py-[6px] px-2 rounded-lg items-center"
                  >
                    <Rank
                      rank={row.rank}
                      description={row.description}
                    />
                    <Link
                      href={"/team?id=" + row.id}
                      className="flex w-full justify-around"
                    >
                      <div>
                        <Image
                          src={row.logo}
                          height={100}
                          width={100}
                          style={{ width: "25px", height: "25px" }}
                          alt="Picture of the author"
                          className="inline mr-3"
                        />
                      </div>
                      <div className={`w-32 ${ellipsisStyling}`}>
                        {row.name}
                      </div>
                      <div className="w-10 text-center">
                        {row.played}
                      </div>
                      <div className="w-10 text-center">
                        {row.goalsDiff}
                      </div>
                      <div className="w-10 text-center">
                        {row.points}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Page;
