"use client";
import React, { useEffect, useState } from "react";
import { CompetitionBtn } from "./CompetitionBtn";
import socket from "../app/functions/Socket";
import { ILeagueButton, ICountry } from "./CompetitionBtn";
import Image from "next/image";
import { divStyling } from "@/app/functions/DivStyling";

function Competitions() {
  const [content, setContent] = useState<ICountry[]>();
  const [show, setShow] = useState<string>("");

  const handleClick = (name: string) => {
    if (show == name) setShow("");
    else setShow(name);
  };

  socket.on("competitions", function (data, callback) {
    setContent(data);
  });

  useEffect(() => {
    socket.emit("competitions", "smth");
  }, []);

  return content ? (
    <div
      className={`animate-fade-in xl:basis-1/4 xl:w-80 w-full h-full ${divStyling}`}
    >
      <div className="animate-fade-in w-full h-fit py-2 xl:px-4 border-none">
        <h2 className="mt-1 mb-2">Competitions</h2>
        <hr className="h-[2px] border-none bg-slate-800 mx-3 xl:mx-0" />
        <div className="flex flex-col mt-3">
          {content.map((country: ICountry, index) => {
            const isExpanded = country.name === show;

            return (
              <div key={index}>
                <div
                  className="flex py-1 px-3 rounded-md cursor-pointer hover:bg-slate-800"
                  onClick={() => handleClick(country.name)}
                >
                  <Image
                    src={
                      country.flag
                        ? country.flag
                        : "https://static.flashscore.com/res/_fs/build/world.b7d16db.png"
                    }
                    height={100}
                    width={100}
                    style={{ width: "30px", height: "30px" }}
                    alt="Picture of the author"
                    className="inline mr-3"
                  />
                  <span className="my-auto">{country.name}</span>
                  <Image
                    src={
                      isExpanded
                        ? "/down-arrow.svg"
                        : "/right-arrow.svg"
                    }
                    priority
                    height={0}
                    width={0}
                    style={{ width: "auto", height: "25px" }}
                    alt="Picture of the author"
                    className="ml-auto my-auto inline"
                  />
                </div>
                <div id="leaguesDiv">
                  {isExpanded &&
                    country.leagues.map(
                      (league: ILeagueButton, index) => (
                        <CompetitionBtn key={index} {...league} />
                      )
                    )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`animate-fade-in xl:basis-1/4 xl:w-80 w-full min-h-dvh ${divStyling}`}
    ></div>
  );
}

export default Competitions;
