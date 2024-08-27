import { ILiveGame } from "@/components/LiveGames";
import React, { useEffect, useState } from "react";
import socket from "@/app/functions/Socket";
import GamesList from "@/components/GamesList";

interface MatchHistoryProps {
  id: string | null;
}

function MatchHistory({ id }: MatchHistoryProps) {
  const [matchHistory, setMatchHistory] = useState<ILiveGame[]>();

  useEffect(() => {
    socket.emit("get_match_history", id);
  }, [id]);

  socket.on("get_match_history", (data: ILiveGame[]) => {
    setMatchHistory(data);
  });

  return (
    <div className="flex flex-col">
      <h2>Last 20 games</h2>
      {matchHistory && <GamesList content={matchHistory} isHistory />}
    </div>
  );
}

export default MatchHistory;
