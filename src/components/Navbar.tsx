"use client";
import React, { useEffect, useRef, useState } from "react";
import socket from "@/app/functions/Socket";
import Image from "next/image";
import Link from "next/link";
import { ellipsisStyling } from "@/app/functions/EllipsisStyling";
import { divStyling } from "@/app/functions/DivStyling";

interface ISearchPlayer {
  id: number;
  firstName: string;
  lastName: string;
  nationality: string;
}

function Navbar() {
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

  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRefMobile = useRef<HTMLInputElement>(null);
  const [contentSearch, setContentSearch] =
    useState<ISearchPlayer[]>();
  const [isMobile, setIsMobile] = useState<boolean>();
  const [mobileSearchActive, setMobileSearchActive] = useState(false);

  const checkIfEnter: React.KeyboardEventHandler<HTMLDivElement> = (
    e
  ) => {
    if (e.key == "Enter") {
      setInputValue(inputRef.current!.value);
    }
  };

  const mobileInputCheck = () => {
    if (inputRefMobile.current) {
      setInputValue(inputRefMobile.current!.value);
    }
  };

  socket.on("search_player", function (data) {
    setContentSearch(data);
  });

  useEffect(() => {
    if (inputValue.length > 3)
      socket.emit("search_player", inputValue);
  }, [inputValue]);

  const InputElement = () => {
    return (
      <input
        type="text"
        className="w-full text-white bg-matchPitchBg100 rounded-lg outline-none"
        placeholder="Search players or teams"
        ref={inputRef}
        onKeyDown={checkIfEnter}
      />
    );
  };

  useEffect(() => {
    setIsMobile(determineInitialWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile ? (
    <>
      {mobileSearchActive && (
        <div className="fixed z-10 min-h-dvh w-full left-0 top-0 bg-matchPitchBg100">
          <div className="border-2 border-white rounded-lg">
            <div className="flex items-center">
              <input
                type="text"
                className="w-full p-5 text-white bg-matchPitchBg outline-none rounded-lg"
                placeholder="Search players or teams"
                ref={inputRefMobile}
              />
              <div className="flex items-center">
                <Image
                  src="/search.svg"
                  priority
                  height={100}
                  width={100}
                  style={{ width: "30px", height: "30px" }}
                  alt="Picture of the author"
                  className="rounded-md mr-6"
                  onClick={mobileInputCheck}
                />
              </div>
            </div>
            {contentSearch && (
              <ul className="max-h-dvh z-10 overflow-scroll bg-matchPitchBg w-full translate-y-2">
                {contentSearch.map((item: ISearchPlayer, index) => {
                  return (
                    <li
                      key={index}
                      className="mx-3 p-2 rounded-lg hover:bg-slate-800"
                    >
                      <Link href={"/player?id=" + item.id}>
                        {item.firstName} {item.lastName},{" "}
                        {item.nationality}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
      <nav
        className={`flex justify-between w-full bg-matchPitchBg rounded-b-xl border-b-2 border-x-2 border-slate-800 ${
          isMobile ? "mb-2" : "mb-4"
        }`}
      >
        <Link href="/">
          <Image
            src="/logo.svg"
            priority
            height={0}
            width={0}
            style={{ width: "auto", height: "50px" }}
            alt="Picture of the author"
            className="rounded-md ml-1"
          />
        </Link>
        <div className="flex items-center">
          <Image
            src="/search.svg"
            priority
            height={100}
            width={100}
            style={{ width: "30px", height: "30px" }}
            alt="Picture of the author"
            className="rounded-md mr-3"
            onClick={() => setMobileSearchActive(true)}
          />
        </div>
      </nav>
    </>
  ) : (
    <nav className="flex justify-between w-full mb-4 bg-matchPitchBg rounded-b-xl border-b-2 border-x-2 border-slate-800">
      <Link href="/" className="h-fit my-auto">
        <Image
          src="/logo.svg"
          priority
          height={0}
          width={0}
          style={{ width: "auto", height: "70px" }}
          alt="Picture of the author"
          className="rounded-md"
        />
      </Link>
      <div className="flex h-20 items-center relative">
        <div
          className={`flex p-2 h-12 w-80 items-center mr-4 gap-2 ${ellipsisStyling} ${divStyling}`}
        >
          <Image
            src="/search.svg"
            priority
            height={100}
            width={100}
            style={{ width: "25px", height: "25px" }}
            alt="Picture of the author"
            className="rounded-md"
          />
          <InputElement />
        </div>
        {contentSearch && (
          <ul className="py-3 z-10 absolute top-0 w-80 translate-y-20 bg-matchPitchBg100 ">
            {contentSearch.map((item: ISearchPlayer, index) => {
              return (
                <li
                  key={index}
                  className="mx-3 p-2 rounded-lg hover:bg-slate-800"
                >
                  <Link
                    href={"/player?id=" + item.id}
                    onClick={() => setContentSearch(undefined)}
                  >
                    {item.firstName} {item.lastName},{" "}
                    {item.nationality}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
