"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TeamInfo from "./components/TeamInfo";
import socket from "@/app/functions/Socket";
import { ILiveGame } from "@/components/LiveGames";
import GamesList from "@/components/GamesList";
import Image from "next/image";
import GameCard from "@/components/GameCard";
import Footer from "@/components/Footer";
import { divStyling } from "../functions/DivStyling";
import MobileMenu from "@/components/MobileMenu";

export interface Ih1Content {
  name: string;
  logo: string;
  code: string;
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

  const [activeCol, setActiveCol] = useState<string>("details");
  const [isMobile, setIsMobile] = useState<boolean>(
    !determineInitialWidth()
  );
  const searchParams = useSearchParams();
  const teamID = searchParams.get("id");
  const [matchHistory, setMatchHistory] = useState<ILiveGame[]>();
  const [matchFuture, setMatchFuture] = useState<ILiveGame[]>();
  const [h1content, seth1Content] = useState<Ih1Content>();
  const [chosenMatchID, setChosenMatchID] = useState<number>();

  useEffect(() => {
    setChosenMatchID(undefined);
    socket.emit("get_match_history", teamID);
    socket.emit("get_match_future", teamID);
  }, [teamID]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  socket.on("get_match_history", (data: ILiveGame[]) => {
    setMatchHistory(data);
  });

  socket.on("get_match_future", (data: ILiveGame[]) => {
    console.log(data.length);
    setMatchFuture(data);
  });

  return (
    <div className="container xl:px-5 px-2 mx-auto">
      <Navbar />
      <MobileMenu
        firstIcon="/history.svg"
        secondIcon="/future.svg"
        thirdIcon="/details.svg"
        firstCol="history"
        secondCol="future"
        thirdCol="details"
        activeCol={activeCol}
        setActiveCol={setActiveCol}
      />
      <main className="grow min-h-dvh">
        {isMobile ? (
          <>
            {h1content ? (
              <div className="flex w-full justify-center items-center gap-3 my-3">
                <Image
                  src={
                    h1content.logo ? h1content.logo : "/no-image.png"
                  }
                  height={100}
                  width={100}
                  style={{
                    width: "60px",
                    height: "60px",
                  }}
                  alt="Picture of the author"
                  className="inline bg-white rounded-lg p-1"
                />
                <h1>{h1content.name}</h1>
              </div>
            ) : (
              <div
                className={`animate-fade-in mx-auto w-24 h-16 my-3 ${divStyling}`}
              ></div>
            )}
            <div className="">
              {activeCol == "history" &&
                (matchHistory ? (
                  <div
                    className={`basis-1/3 flex flex-col ${divStyling}`}
                  >
                    <h2 className="mt-3 mb-2">Last max. 20 games</h2>
                    <GamesList
                      content={matchHistory}
                      isHistory
                      setChosenMatchID={setChosenMatchID}
                      setActiveCol={setActiveCol}
                    />
                  </div>
                ) : (
                  <div
                    className={`animate-pulse h-dvh basis-1/3 flex flex-col ${divStyling}`}
                  ></div>
                ))}
              {activeCol == "future" &&
                (matchFuture ? (
                  <div
                    className={`basis-1/3 flex flex-col h-fit ${divStyling}`}
                  >
                    <h2 className="mt-3 mb-2">Next max. 10 games</h2>
                    <GamesList
                      content={matchFuture}
                      isFuture
                      setChosenMatchID={setChosenMatchID}
                      setActiveCol={setActiveCol}
                    />
                  </div>
                ) : (
                  <div
                    className={`animate-pulse basis-1/3 flex flex-col h-dvh ${divStyling}`}
                  ></div>
                ))}
              {activeCol == "details" &&
                (chosenMatchID ? (
                  <GameCard
                    id={chosenMatchID}
                    onClose={setChosenMatchID}
                  />
                ) : (
                  <TeamInfo
                    teamId={teamID}
                    seth1Content={seth1Content}
                  />
                ))}
            </div>
          </>
        ) : (
          <>
            {h1content ? (
              <div className="flex w-full justify-center items-center gap-3 mb-5">
                <Image
                  src={
                    h1content.logo ? h1content.logo : "/no-image.png"
                  }
                  height={100}
                  width={100}
                  style={{
                    width: "60px",
                    height: "60px",
                  }}
                  alt="Picture of the author"
                  className="inline bg-white rounded-lg p-1"
                />
                <h1>{h1content.name}</h1>
              </div>
            ) : (
              <div
                className={`animate-fade-in mx-auto w-20 h-16 mb-4 ${divStyling}`}
              ></div>
            )}
            <div className="flex gap-4">
              {matchHistory ? (
                <div
                  className={`basis-1/3 flex flex-col ${divStyling}`}
                >
                  <h2 className="mt-3 mb-2">Last max. 20 games</h2>
                  <GamesList
                    content={matchHistory}
                    isHistory
                    setChosenMatchID={setChosenMatchID}
                  />
                </div>
              ) : (
                <div
                  className={`animate-pulse h-dvh basis-1/3 flex flex-col ${divStyling}`}
                ></div>
              )}
              {matchFuture ? (
                <div
                  className={`basis-1/3 flex flex-col h-fit ${divStyling}`}
                >
                  <h2 className="mt-3 mb-2">Next max. 10 games</h2>
                  <GamesList
                    content={matchFuture}
                    isFuture
                    setChosenMatchID={setChosenMatchID}
                  />
                </div>
              ) : (
                <div
                  className={`animate-pulse basis-1/3 flex flex-col h-dvh ${divStyling}`}
                ></div>
              )}
              <div className="basis-1/3">
                {chosenMatchID ? (
                  <GameCard
                    id={chosenMatchID}
                    onClose={setChosenMatchID}
                  />
                ) : (
                  <TeamInfo
                    teamId={teamID}
                    seth1Content={seth1Content}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Page;
