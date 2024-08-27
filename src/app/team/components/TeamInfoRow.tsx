"use client";
import React, { ReactNode } from "react";

interface IInfoRowProps {
  children: ReactNode;
}

function InfoRow({ children }: IInfoRowProps) {
  return (
    <div className="flex justify-between gap-3 w-full">
      {children}
    </div>
  );
}

export default InfoRow;
