import React from "react";
import { Tooltip } from "react-tooltip";

interface RankProps {
  rank: number;
  description: string;
}

function TeamForm({ rank, description }: RankProps) {
  var classname = "none";

  if (!description) description = "None";
  if (description.includes("Champions League"))
    classname = "bg-blue-800";
  else if (description.includes("Europa League"))
    classname = "bg-red-900";
  else if (description.includes("Conference League"))
    classname = "bg-yellow-700";
  else if (description.includes("Relegation"))
    classname = "bg-red-600";
  else if (description.includes("Promotion"))
    classname = "bg-blue-800";

  return (
    <div
      className={
        `w-8 h-8 mr-2 flex justify-center rounded-md items-center ` +
        classname
      }
      data-tooltip-id={rank.toString()}
      data-tooltip-content={description}
      data-tooltip-place="left"
    >
      {rank}.
      {description != "None" && (
        <Tooltip
          id={rank.toString()}
          style={{
            width: "fit-content",
          }}
        />
      )}
    </div>
  );
}

export default TeamForm;
