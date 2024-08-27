"use client";
import React, { useEffect, useState } from "react";
import socket from "@/app/functions/Socket";
import Image from "next/image";
import { Ih1Content } from "../page";
import InfoRow from "./TeamInfoRow";
import { divStyling } from "@/app/functions/DivStyling";

interface ITeamInfoSocketData {
  0: ITeam;
  1: IVenue;
}

interface ITeam {
  id: number;
  name: string;
  code: string;
  country: string;
  founded: number;
  national: boolean;
  logo: string;
}

interface IVenue {
  id: number;
  name: string;
  address: string;
  city: string;
  capacity: number;
  surface: string;
  image: string;
}

interface ITeamInfoProps {
  teamId: string | null;
  seth1Content?: React.Dispatch<
    React.SetStateAction<Ih1Content | undefined>
  >;
}

function Page({ teamId, seth1Content }: ITeamInfoProps) {
  const [teamContent, setTeamContent] = useState<ITeam>();
  const [venueContent, setVenueContent] = useState<IVenue>();

  useEffect(() => {
    socket.emit("get_team_info", teamId);
  }, [teamId]);

  useEffect(() => {
    if (teamContent && seth1Content) {
      var tempTeamContent = {
        name: teamContent.name,
        logo: teamContent.logo,
        code: teamContent.code,
      };
      seth1Content(tempTeamContent);
    }
  }, [teamContent, seth1Content]);

  socket.on("get_team_info", (data: ITeamInfoSocketData) => {
    setTeamContent(data[0]);
    setVenueContent(data[1]);
  });

  return teamContent && venueContent ? (
    <div className="basis-1/3 flex flex-col">
      <div className={`mb-3 ${divStyling}`}>
        <div className="animate-fade-in flex flex-col gap-3 p-4">
          <h2>General</h2>
          <InfoRow>
            <div>Country:</div>
            {teamContent.country}
          </InfoRow>
          <InfoRow>
            <div>City: </div>
            {venueContent.city ? venueContent.city : "Unknown"}
          </InfoRow>
          <InfoRow>
            <div>Founded: </div>
            {teamContent.founded ? teamContent.founded : "Unknown"}
          </InfoRow>
        </div>
      </div>
      <div className={divStyling}>
        <div className="animate-fade-in flex flex-col gap-3 p-4 text-right">
          <h2>Venue</h2>
          <InfoRow>
            <div>Venue: </div>
            {venueContent.name ? venueContent.name : "Unknown"}
          </InfoRow>
          <InfoRow>
            <div>Address: </div>
            {venueContent.address ? venueContent.address : "Unknown"}
          </InfoRow>
          <InfoRow>
            <div>Capacity: </div>
            {venueContent.capacity
              ? venueContent.capacity
              : "Unknown"}
          </InfoRow>
          <InfoRow>
            <div>Surface: </div>
            {venueContent.surface ? venueContent.surface : "Unknown"}
          </InfoRow>

          {venueContent.image && (
            <Image
              src={venueContent.image}
              height={500}
              width={500}
              style={{
                width: "full",
                height: "auto",
              }}
              alt="Picture of the author"
              priority
            />
          )}
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`animate-pulse basis-1/3 h-dvh flex flex-col ${divStyling}`}
    ></div>
  );
}

export default Page;
