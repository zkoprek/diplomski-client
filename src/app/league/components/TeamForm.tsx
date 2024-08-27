import React from "react";

interface TeamFormProps {
  form: string[];
}

function TeamForm({ form }: TeamFormProps) {
  return (
    <div className="w-52 flex gap-1 justify-center">
      {form.map((char, index) => {
        return (
          <div
            key={index}
            className={`w-7 rounded-md flex justify-center items-center ${
              char == "W"
                ? "bg-green-600"
                : char == "D"
                ? "bg-gray-600"
                : "bg-red-600"
            }`}
          >
            <span>{char}</span>
          </div>
        );
      })}
    </div>
  );
}

export default TeamForm;
