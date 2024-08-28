"use client";
import React, { useEffect, useState } from "react";
import socket from "../app/functions/Socket";
import GameCard from "@/components/GameCard";
import GamesList from "./GamesList";
import { divStyling } from "@/app/functions/DivStyling";

export interface ILiveGame {
  id: number;
  country: string;
  countryFlag: string;
  competition: string;
  homeTeam: string;
  homeTeamLogo: string;
  awayTeam: string;
  awayTeamLogo: string;
  goalsHome: number;
  goalsAway: number;
  statusShort?: string;
  elapsed?: number;
  date?: string;
  time?: string;
}

interface ILiveGameProps {
  activeCol?: string;
  setActiveCol?: React.Dispatch<React.SetStateAction<string>>;
}

function LiveGames({ activeCol, setActiveCol }: ILiveGameProps) {
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

  const [isMobile, setIsMobile] = useState<boolean>(
    !determineInitialWidth()
  );
  const [content, setContent] = useState<ILiveGame[]>([]);
  const [chosenMatchID, setChosenMatchID] = useState<number>();

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  socket.on("live_games", (data) => {
    setContent(data);
  });

  useEffect(() => {
    socket.emit("live_games", false);
    socket.emit("live_games", true);
    return () => {
      socket.emit("live_games", false);
    };
  }, []);

  useEffect(() => {
    if (chosenMatchID && setActiveCol) setActiveCol("details");
  }, [chosenMatchID, setActiveCol]);

  return content.length > 0 ? (
    <div className="block xl:flex xl:basis-3/4 w-full gap-4">
      {((activeCol == "live" && isMobile) || !isMobile) && (
        <div
          className={`animate-fade-in basis-1/2 h-fit pb-3 ${divStyling}`}
        >
          <h2 className="mt-3 mb-2">Live Matches</h2>
          <div className="w-full">
            <GamesList
              content={content}
              setChosenMatchID={setChosenMatchID}
              isLive
            />
          </div>
        </div>
      )}

      {isMobile && chosenMatchID && activeCol == "details" && (
        <GameCard id={chosenMatchID!} onClose={setChosenMatchID} />
      )}
      {!isMobile && chosenMatchID ? (
        <GameCard id={chosenMatchID!} onClose={setChosenMatchID} />
      ) : (
        <div className="basis-1/2 mt-3 hidden xl:block">
          <h2>Choose a match for details!</h2>
        </div>
      )}
    </div>
  ) : isMobile ? (
    <div
      className={`animate-fade-in h-dvh xl:flex xl:basis-3/4 block w-full ${divStyling}`}
    ></div>
  ) : (
    <div className={`h-dvh basis-3/4 flex w-full gap-4`}>
      <div
        className={`animate-fade-in basis-1/2 h-dvh ${divStyling}`}
      ></div>
      <div
        className={`animate-fade-in basis-1/2 h-dvh ${divStyling}`}
      ></div>
    </div>
  );
}

export default LiveGames;
