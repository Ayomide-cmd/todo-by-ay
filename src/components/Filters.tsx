import React from "react";

type FilterType = "all" | "completed" | "incomplete";

interface FiltersProps {
  currentFilter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export default function Filters({ currentFilter, setFilter }: FiltersProps) {
  return (
    <div className="flex gap-4 justify-center my-4">
      <button
        onClick={() => setFilter("all")}
        className={`px-4 py-2 rounded ${
          currentFilter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        All
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`px-4 py-2 rounded ${
          currentFilter === "completed" ? "bg-green-600 text-white" : "bg-gray-200"
        }`}
      >
        Completed
      </button>
      <button
        onClick={() => setFilter("incomplete")}
        className={`px-4 py-2 rounded ${
          currentFilter === "incomplete" ? "bg-red-600 text-white" : "bg-gray-200"
        }`}
      >
        Incomplete
      </button>
    </div>
  );
}
