import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Plus, Trash2, Users, Trophy, Zap } from 'lucide-react';

// TypeScript interfaces
interface Tournament {
  id: number;
  name: string;
  winner: string;
  date: string;
  prize: string;
  participants: number;
}

interface WinnerStat {
  name: string;
  wins: number;
}

interface ParticipantTrend {
  tournament: string;
  participants: number;
}

interface PrizeDistribution {
  name: string;
  total: number;
  [key: string]: any; // Index signature for Recharts compatibility
}

export default function M47WSurvivor() {
  const [tournaments, setTournaments] = useState<Tournament[]>([
    { id: 1, name: 'Season 1', winner: 'Player1', date: '2025-01-15', prize: '$500', participants: 32 },
    { id: 2, name: 'Season 2', winner: 'Player2', date: '2025-02-20', prize: '$750', participants: 48 },
    { id: 3, name: 'Season 3', winner: 'Player3', date: '2025-03-10', prize: '$1000', participants: 64 },
    { id: 4, name: 'Spring Clash', winner: 'Player1', date: '2025-04-05', prize: '$500', participants: 40 },
  ]);

  const [newTournament, setNewTournament] = useState({
    name: '',
    winner: '',
    date: '',
    prize: '',
    participants: ''
  });

  const addTournament = () => {
    if (newTournament.name && newTournament.winner) {
      setTournaments([...tournaments, { id: Date.now(), ...newTournament, participants: parseInt(newTournament.participants) || 0 }]);
      setNewTournament({ name: '', winner: '', date: '', prize: '', participants: '' });
    }
  };

  const deleteTournament = (id: number) => {
    setTournaments(tournaments.filter((t: Tournament) => t.id !== id));
  };

  const winnerStats: WinnerStat[] = tournaments.reduce((acc: WinnerStat[], t: Tournament) => {
    const existing = acc.find(w => w.name === t.winner);
    if (existing) {
      existing.wins += 1;
    } else {
      acc.push({ name: t.winner, wins: 1 });
    }
    return acc;
  }, []).sort((a: WinnerStat, b: WinnerStat) => b.wins - a.wins);

  const participantsTrend: ParticipantTrend[] = tournaments.map((t: Tournament) => ({
    tournament: t.name,
    participants: t.participants
  }));

  const prizeDistribution: PrizeDistribution[] = tournaments.reduce((acc: PrizeDistribution[], t: Tournament) => {
    // Extract numeric value from prize string (e.g., "$500" -> 500)
    const prizeMatch = t.prize.match(/\d+/);
    const amount = prizeMatch ? parseInt(prizeMatch[0]) : 0;
    const existing = acc.find(p => p.name === t.winner);
    if (existing) {
      existing.total += amount;
    } else {
      acc.push({ name: t.winner, total: amount });
    }
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 py-16 px-6">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%23fff%27 fill-opacity=%270.1%27%3E%3Cpath d=%27M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur">
              <Zap className="text-yellow-300" size={32} />
            </div>
            <div>
              <h1 className="text-5xl font-black text-white">M47W - SurvivoR</h1>
              <p className="text-purple-100 mt-2">Competitive Gaming Server & Tournament Hub</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Tournaments</p>
                <p className="text-4xl font-bold mt-2">{tournaments.length}</p>
              </div>
              <Trophy size={48} className="opacity-30" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total Participants</p>
                <p className="text-4xl font-bold mt-2">{tournaments.reduce((sum: number, t: Tournament) => sum + t.participants, 0)}</p>
              </div>
              <Users size={48} className="opacity-30" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-sm">Total Prize Pool</p>
                <p className="text-4xl font-bold mt-2">${tournaments.reduce((sum: number, t: Tournament) => {
                  const prizeMatch = t.prize.match(/\d+/);
                  return sum + (prizeMatch ? parseInt(prizeMatch[0]) : 0);
                }, 0)}</p>
              </div>
              <Trophy size={48} className="opacity-30" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Winner Statistics */}
          <div className="bg-slate-800 rounded-lg p-6 shadow-xl border border-purple-500/20">
            <h2 className="text-2xl font-bold text-white mb-6">Top Winners</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={winnerStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #7c3aed' }} />
                <Bar dataKey="wins" fill="#a78bfa" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Participants Trend */}
          <div className="bg-slate-800 rounded-lg p-6 shadow-xl border border-purple-500/20">
            <h2 className="text-2xl font-bold text-white mb-6">Participation Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={participantsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="tournament" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #7c3aed' }} />
                <Line type="monotone" dataKey="participants" stroke="#60a5fa" strokeWidth={2} dot={{ fill: '#60a5fa' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Winner Distribution */}
          <div className="bg-slate-800 rounded-lg p-6 shadow-xl border border-purple-500/20">
            <h2 className="text-2xl font-bold text-white mb-6">Prize Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={prizeDistribution} dataKey="total" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  <Cell fill="#a78bfa" />
                  <Cell fill="#60a5fa" />
                  <Cell fill="#34d399" />
                  <Cell fill="#fbbf24" />
                  <Cell fill="#f87171" />
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #7c3aed' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Server Stats */}
          <div className="bg-slate-800 rounded-lg p-6 shadow-xl border border-purple-500/20">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-700 rounded">
                <span className="text-slate-300">Average Participants:</span>
                <span className="text-purple-400 font-bold">
                  {tournaments.length > 0 ? Math.round(tournaments.reduce((sum: number, t: Tournament) => sum + t.participants, 0) / tournaments.length) : 0}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-700 rounded">
                <span className="text-slate-300">Most Wins:</span>
                <span className="text-purple-400 font-bold">
                  {winnerStats.length > 0 ? `${winnerStats[0].name} (${winnerStats[0].wins})` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-700 rounded">
                <span className="text-slate-300">Unique Winners:</span>
                <span className="text-purple-400 font-bold">{winnerStats.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tournament Data Table */}
        <div className="bg-slate-800 rounded-lg p-6 shadow-xl border border-purple-500/20 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Tournament History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-purple-500/30">
                  <th className="text-left py-3 px-4 text-purple-300 font-bold">Tournament</th>
                  <th className="text-left py-3 px-4 text-purple-300 font-bold">Winner</th>
                  <th className="text-left py-3 px-4 text-purple-300 font-bold">Date</th>
                  <th className="text-left py-3 px-4 text-purple-300 font-bold">Prize</th>
                  <th className="text-left py-3 px-4 text-purple-300 font-bold">Participants</th>
                  <th className="text-center py-3 px-4 text-purple-300 font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {tournaments.length > 0 ? (
                  tournaments.map((t: Tournament) => (
                    <tr key={t.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                      <td className="py-3 px-4 text-white">{t.name}</td>
                      <td className="py-3 px-4 text-slate-300">{t.winner}</td>
                      <td className="py-3 px-4 text-slate-300">{t.date}</td>
                      <td className="py-3 px-4 text-slate-300">{t.prize}</td>
                      <td className="py-3 px-4 text-slate-300">{t.participants}</td>
                      <td className="py-3 px-4 text-center">
                        <button onClick={() => deleteTournament(t.id)} className="text-red-400 hover:text-red-300 transition">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 px-4 text-center text-slate-400">
                      No tournaments found. Add your first tournament below!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Tournament Form */}
        <div className="bg-slate-800 rounded-lg p-6 shadow-xl border border-purple-500/20">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Plus size={24} />
            Add Tournament
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <input
              type="text"
              placeholder="Tournament Name"
              value={newTournament.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTournament({ ...newTournament, name: e.target.value })}
              className="bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-purple-500 outline-none"
            />
            <input
              type="text"
              placeholder="Winner"
              value={newTournament.winner}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTournament({ ...newTournament, winner: e.target.value })}
              className="bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-purple-500 outline-none"
            />
            <input
              type="date"
              value={newTournament.date}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTournament({ ...newTournament, date: e.target.value })}
              className="bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-purple-500 outline-none"
            />
            <input
              type="text"
              placeholder="Prize (e.g., $500)"
              value={newTournament.prize}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTournament({ ...newTournament, prize: e.target.value })}
              className="bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-purple-500 outline-none"
            />
            <input
              type="number"
              placeholder="Participants"
              value={newTournament.participants}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTournament({ ...newTournament, participants: e.target.value })}
              className="bg-slate-700 text-white px-4 py-2 rounded border border-slate-600 focus:border-purple-500 outline-none"
            />
            <button
              onClick={addTournament}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded font-bold transition shadow-lg"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 border-t border-slate-800 mt-16 py-6 text-center text-slate-400">
        <p>M47W - SurvivoR © 2025 | Discord Server Tournament Hub</p>
      </div>
    </div>
  );
}