"use client"

import React, { useState, useEffect, useRef } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import Image from "next/image";
// IMPORTING PROPS
import { ButtonProps } from "@/types/props";

function Download({handleClick}: ButtonProps) {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        popupRef.current &&
        (popupRef.current as HTMLElement).contains(event.target)
      ) {
        setShowPopup(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleButtonClick = () => {
    if(handleClick) handleClick()
    setShowPopup(true);
  };

  return (
    <div>
      <button
        className="font-bold text-white hover:border-[#4D3C77] hover:bg-[#4D3C77] border p-2 rounded"
        onClick={handleButtonClick}
      >
        <DownloadIcon width={15} height={15}  />
        Download
      </button>
      {showPopup && (
        <div
          ref={popupRef}
          className="absolute right-[5%] w-1/4 mt-2 h-full items-center"
        >
          <div className="bg-white p-2 rounded shadow">
            <div className=" hover:border hover:bg-gray-100 rounded p-2">
              <h2 className="text-black font-bold flex gap-2">
                <Image
                  alt="singleFile"
                  src={"/singleFile.svg"}
                  height={20}
                  width={20}
                />
                Single file
              </h2>
              <p className="text-gray-700 pl-6">
                Requires a Scarb project with{" "}
                <span className="text-gray-700 font-semibold">
                  openzeppelin
                </span>{" "}
                as a dependency.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Download;