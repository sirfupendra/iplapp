

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../maincontent/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../maincontent/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../maincontent/Table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from '../auth/AuthContext';
import '../App.css'; 

export default function PlayerDetail() {
  const { playerName } = useParams(); 
  const navigate = useNavigate();
  const { user, logout } = useAuth(); 

  const [playerData, setPlayerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGround, setSelectedGround] = useState('');
  const [selectedBowler, setSelectedBowler] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  
  const fetchPlayerData = async (name) => {
    try {
      const response = await fetch(`http://localhost:5000/api/player/${name}`);
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        setPlayerData(data);
        setSelectedGround(data.groundPerformance[0]?.ground || '');
        setSelectedBowler(data.bowlerPerformance[0]?.bowler || '');
      }
    } catch (error) {
      console.error('Error fetching player data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (playerName) fetchPlayerData(playerName);
  }, [playerName]);

  
  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) fetchPlayerData(searchQuery.trim());
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    playerData && (
      <div className="container wrapper">
        

        
        

        {/* Player Profile */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <div
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={playerData.imageUrl}
              alt={playerData.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold">{playerData.name}</h1>
            <p className="text-xl text-gray-700">{playerData.team}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ground Performance */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle>Ground Performance</CardTitle>
              <CardDescription>Average and strike rate on different grounds</CardDescription>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setSelectedGround} defaultValue={selectedGround}>
                <SelectTrigger className="w-full border-gray-300">
                  <SelectValue value={selectedGround} />
                </SelectTrigger>
                <SelectContent>
                  {playerData.groundPerformance.map((perf) => (
                    <SelectItem key={perf.ground} value={perf.ground}>
                      {perf.ground}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={playerData.groundPerformance.filter((perf) => perf.ground === selectedGround)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ground" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="average" fill="#8884d8" />
                    <Bar dataKey="strikeRate" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Maximum Scores */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle>Maximum Scores</CardTitle>
              <CardDescription>Highest individual scores in IPL</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Score</TableHead>
                    <TableHead>Against</TableHead>
                    <TableHead>Ground</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {playerData.maxScores.map((score, index) => (
                    <TableRow key={index}>
                      <TableCell>{score.score}</TableCell>
                      <TableCell>{score.against}</TableCell>
                      <TableCell>{score.ground}</TableCell>
                      <TableCell>{new Date(score.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Bowler Performance */}
          <Card className="bg-white shadow-md md:col-span-2">
            <CardHeader>
              <CardTitle>Performance Against Specific Bowlers</CardTitle>
              <CardDescription>Analysis of batting performance against particular bowlers</CardDescription>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setSelectedBowler} defaultValue={selectedBowler}>
                <SelectTrigger className="w-full border-gray-300">
                  <SelectValue value={selectedBowler} />
                </SelectTrigger>
                <SelectContent>
                  {playerData.bowlerPerformance.map((perf) => (
                    <SelectItem key={perf.bowler} value={perf.bowler}>
                      {perf.bowler}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={playerData.bowlerPerformance.filter((perf) => perf.bowler === selectedBowler)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bowler" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="runs" fill="#8884d8" />
                    <Bar dataKey="balls" fill="#82ca9d" />
                    <Bar dataKey="dismissals" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  );
}

