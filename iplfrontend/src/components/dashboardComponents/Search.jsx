import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchComponent({
  searchQuery,
  onSearchChange,
  players,
  onSelect,
}) {
  return (
    <div className="flex flex-col p-2 py-6 searchbar">
      {/* Search Bar */}
      <div className="bg-white flex items-center w-full searchx rounded-full shadow-lg p-2 mb-5 sticky top-5">
        <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
          <svg
            className="h-6 w-6 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <input
          type="text"
          placeholder="Search for a player..."
          value={searchQuery}
          onChange={onSearchChange}
          className="font-bold uppercase rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 focus:outline-none focus:shadow-outline lg:text-sm text-xs"
        />
        <div className="bg-gray-600 p-2 hover:bg-blue-400 cursor-pointer mx-2 rounded-full">
          <AiOutlineSearch className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Player Dropdown */}
      {searchQuery && (
        <div className="dropdownx">
          {players.length > 0 ? (
            players.map((player) => (
              <div
                key={player._id}
                onClick={() => onSelect(player.name)}
                className="p-3 cursor-pointer dropdown-content hover:text-blue-700 transition duration-150"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={player.imageUrl}
                    alt={player.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-semibold">{player.name}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-500">No players found</div>
          )}
        </div>
      )}
    </div>
  );
}
