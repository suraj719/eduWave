import React, { useState } from "react";

export default function Option({ option }) {
  const [selected, setSelected] = useState("");

  return (
    <>
      <button
        className={
          "rounded-lg p-4 px-8 bg-sky-200 text-black w-[60%] mt-2 hover:bg-sky-300" +
          (selected === option
            ? "border border-4 border-green-500 bg-sky-300"
            : "")
        }
        onClick={() => setSelected(option)}
      >
        <p>{option}</p>
      </button>
    </>
  );
}
