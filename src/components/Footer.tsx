"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="flex justify-between w-full mt-5 bg-matchPitchBg rounded-t-xl border-t-2 border-x-2 border-slate-800">
      <Link href="/">
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
      <div className="flex h-20 items-center text-right px-4 text-xs">
        Made by Zvonimir Koprek <br />
        FOI Varaždin, 2024.
      </div>
    </footer>
  );
}

export default Footer;
