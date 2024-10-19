import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai'; // Search icon from react-icons
import "../App.css";
import { useAuth } from '../auth/AuthContext';

function Card({ children, className, onClick }) {
  return (
    <div 
      className={`rounded-lg overflow-hidden shadow-md ${className}`} 
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function CardHeader({ children }) {
  return <div className="w-full">{children}</div>;
}

function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}

function CardTitle({ children, className }) {
  return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>;
}

export default function Dashboard() {
  
  const [players, setPlayers] = useState([]);
  const [displayedPlayers, setDisplayedPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, logout ,isAuthenticated} = useAuth();
  console.log(isAuthenticated());

  const fetchPlayers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/players');
      const data = await response.json();
      setPlayers(data);
      setDisplayedPlayers(getRandomPlayers(data, 9));
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const getRandomPlayers = (playersList, count) => {
    const shuffled = [...playersList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setDisplayedPlayers(getRandomPlayers(players, 3));
    } else {
      const filteredPlayers = players.filter((player) =>
        player.name.toLowerCase().includes(query.toLowerCase())
      );
      setDisplayedPlayers(filteredPlayers);
    }
  };

  const handleCardClick = (playerName) => {
    navigate(`/dashboard/player/${playerName}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="containerx bg-zinc-900 text-white  p-4">
      {/* Search Bar */}
      <div className="flex flex-col p-2 py-6 searchbar">
        <div className="bg-white flex items-center justify-between w-full searchx rounded-full shadow-lg p-2 mb-5 sticky top-5">
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
            onChange={handleSearchChange}
            className="font-bold uppercase rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 focus:outline-none focus:shadow-outline lg:text-sm text-xs"
          />

          <div className="bg-gray-600 p-2 hover:bg-blue-400 cursor-pointer mx-2 rounded-full">
            <AiOutlineSearch className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Enhanced Search Results Dropdown */}
        {searchQuery && (
          <div className=" dropdownx ">
            {displayedPlayers.length > 0 ? (
              displayedPlayers.map((player) => (
                <div
                  key={player._id}
                  onClick={() => handleCardClick(player.name)}
                  className="p-3 cursor-pointer hover:text-zinc-700 dropdown-content hover:text-blue-700 transition duration-150"
                >
                  <div className="flex items-center dropdown-item gap-4">
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

        {/* Player Cards */}
        {!searchQuery && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayedPlayers.map((player) => (
              <Card
                key={player._id}
                className="cursor-pointer"
                onClick={() => handleCardClick(player.name)}
              >
                <CardHeader>
                  <img
                    src={player.imageUrl}
                    alt={player.name}
                    className="w-full h-40 object-cover"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-center">{player.name}</CardTitle>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}




