import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import SearchComponent from "../components/dashboardComponents/Search";
import PlayerCard from "../components/dashboardComponents/PlayerCard";
import "../App.css";

export default function Dashboard() {
  const [players, setPlayers] = useState([]);
  const [initialPlayer, setinitialPlayer] = useState([]);
  const [displayedPlayers, setDisplayedPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();
  console.log(isAuthenticated());

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/players");
        const data = await response.json();
        setPlayers(data);
        const initialDisplay = getRandomPlayers(data, 9);
        setinitialPlayer(initialDisplay);
        setDisplayedPlayers(initialDisplay);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };
    fetchPlayers();
  }, []);

  const getRandomPlayers = (playersList, count) =>
    [...playersList].sort(() => 0.5 - Math.random()).slice(0, count);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setDisplayedPlayers(initialPlayer);
    } else {
      const filtered = players.filter((player) =>
        player.name.toLowerCase().includes(query.toLowerCase())
      );
      setDisplayedPlayers(filtered);
    }
  };

  const handleCardClick = (playerName) => {
    navigate(`/dashboard/player/${playerName}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="containerx bg-zinc-900 text-white p-4">
      <div className="text-center mt-8">
        <h1 className="text-3xl md:text-4xl font-light text-white">
          Uncover the <span className="text-cyan-400 font-semibold">Stats</span>
          , Analyze the{" "}
          <span className="text-cyan-400 font-semibold">Game</span> –
        </h1>
        <h1 className="text-3xl md:text-4xl font-light text-white mt-2">
          <span className="text-cyan-400">Explore</span> IPL Like Never Before!
        </h1>
      </div>

      <SearchComponent
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        players={displayedPlayers}
        onSelect={handleCardClick}
      />

      {!searchQuery && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedPlayers.map((player) => (
            <PlayerCard
              key={player._id}
              player={player}
              onClick={handleCardClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
