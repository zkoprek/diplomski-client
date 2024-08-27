"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import socket from "@/app/functions/Socket";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import classNames from "classnames";
import Footer from "@/components/Footer";
import PlayerDetailedInfo from "./components/PlayerDetailedInfo";
import PlayerBasicInfo from "./components/PlayerBasicInfo";
import { divStyling } from "../functions/DivStyling";
import MobileMenu from "@/components/MobileMenu";
import PlayerSeasons from "./components/PlayerSeasons";

function Page() {
  const determineInitialWidth = () => {
    if (window.innerWidth < 1280) {
      return true;
    } else {
      return false;
    }
  };

  const handleResize = () => {
    if (window.innerWidth < 1280) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const [playerSeasons, setPlayerSeasons] = useState<number[]>([]);
  const [clickedSeason, setClickedSeason] = useState<string>();
  const [lastSeason, setLastSeason] = useState<string>();
  const [activeCol, setActiveCol] = useState<string>("basic");
  const searchParams = useSearchParams();
  const [isMobile, setIsMobile] = useState<boolean>(
    determineInitialWidth()
  );

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  const playerID = searchParams.get("id");

  useEffect(() => {
    setClickedSeason(undefined);
    socket.emit("search_player_seasons", playerID);
  }, [playerID]);

  useEffect(() => {
    if (clickedSeason) setActiveCol("details");
  }, [clickedSeason]);

  socket.on("search_player_seasons", (data) => {
    setPlayerSeasons(data);
    setLastSeason(data[data.length - 2]);
  });

  return (
    <div className="container min-h-dvh xl:px-5 px-2 mx-auto relative flex flex-col">
      <main className="grow">
        {isMobile ? (
          <>
            <Navbar />
            <MobileMenu
              firstIcon="/player-basic-info.svg"
              secondIcon="/seasons.svg"
              thirdIcon="/details.svg"
              firstCol="basic"
              secondCol="seasons"
              thirdCol="details"
              activeCol={activeCol}
              setActiveCol={setActiveCol}
            />
            <div className="flex gap-4">
              {playerSeasons?.length > 0 && playerSeasons[0] != 0 && (
                <>
                  {activeCol == "basic" && playerID && lastSeason && (
                    <PlayerBasicInfo
                      id={playerID}
                      lastSeason={lastSeason}
                    />
                  )}
                  {activeCol == "seasons" && (
                    <PlayerSeasons
                      playerSeasons={playerSeasons}
                      clickedSeason={clickedSeason}
                      setClickedSeason={setClickedSeason}
                    />
                  )}
                  {activeCol == "details" && clickedSeason && (
                    <PlayerDetailedInfo
                      clickedSeason={clickedSeason}
                    />
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <Navbar />
            <div className="flex gap-4">
              {playerSeasons?.length > 0 && playerSeasons[0] != 0 && (
                <>
                  {playerID && lastSeason && (
                    <PlayerBasicInfo
                      id={playerID}
                      lastSeason={lastSeason}
                    />
                  )}
                  <PlayerSeasons
                    playerSeasons={playerSeasons}
                    clickedSeason={clickedSeason}
                    setClickedSeason={setClickedSeason}
                  />
                  {clickedSeason && (
                    <PlayerDetailedInfo
                      clickedSeason={clickedSeason}
                    />
                  )}
                </>
              )}
              {!playerSeasons && (
                <>
                  <div
                    className={`animate-fade-in basis-1/4 h-[500px] ${divStyling}`}
                  ></div>
                  <div
                    className={`animate-fade-in basis-1/6 h-80 ${divStyling}`}
                  ></div>
                </>
              )}
              {playerSeasons[0] == 0 && (
                <>
                  <div>No Info for this Player!</div>
                </>
              )}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Page;
