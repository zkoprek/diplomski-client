"use client";
import LiveGames from "@/components/LiveGames";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import Competitions from "@/components/Competitions";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";

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

  const [activeCol, setActiveCol] = useState<string>("live");
  const [isMobile, setIsMobile] = useState<boolean>(
    !determineInitialWidth()
  );

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container px-2 xl:px-5 mx-auto min-h-dvh flex flex-col">
      <main className="grow">
        <Navbar />
        <MobileMenu
          firstIcon="/competition.svg"
          secondIcon="/live.svg"
          thirdIcon="/details.svg"
          firstCol="competitions"
          secondCol="live"
          thirdCol="details"
          activeCol={activeCol}
          setActiveCol={setActiveCol}
        />
        {isMobile ? (
          <div className="flex justify-left gap-4">
            {activeCol == "competitions" ? (
              <Competitions />
            ) : (
              <LiveGames
                activeCol={activeCol}
                setActiveCol={setActiveCol}
              />
            )}
          </div>
        ) : (
          <div className="flex justify-left gap-4">
            <Competitions />
            <LiveGames
              activeCol={activeCol}
              setActiveCol={setActiveCol}
            />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Page;
