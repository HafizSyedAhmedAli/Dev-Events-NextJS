"use client";
import Image from "next/image";
import React from "react";

const ExploreBtn = () => {
  const handleClick = () => {
    const el = document.getElementById("events");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <button
      type="button"
      id="explore-btn"
      className="mt-7 mx-auto w-fit"
      onClick={handleClick}
    >
      <span className="flex items-center gap-2">
        Explore Events
        <Image src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24} />
      </span>
    </button>
  );
};

export default ExploreBtn;
