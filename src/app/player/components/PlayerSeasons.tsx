import { divStyling } from "@/app/functions/DivStyling";

interface IPlayerSeasonsProps {
  playerSeasons: number[];
  clickedSeason: string | undefined;
  setClickedSeason: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

function PlayerSeasons({
  playerSeasons,
  clickedSeason,
  setClickedSeason,
}: IPlayerSeasonsProps) {
  return (
    <div
      className={`animate-fade-in xl:basis-1/6 w-full flex flex-col items-center h-fit px-3 pb-3 ${divStyling}`}
    >
      <h3 className="animate-fade-in">Seasons</h3>
      <ul className="w-full">
        {playerSeasons.map((item: number, index) => {
          return (
            <li key={index}>
              <button
                className={`animate-fade-in w-full rounded-md hover:bg-slate-800 py-1 ${
                  clickedSeason == item.toString()
                    ? "bg-slate-800"
                    : ""
                }`}
                onClick={() => setClickedSeason(item.toString())}
              >
                {item}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PlayerSeasons;
