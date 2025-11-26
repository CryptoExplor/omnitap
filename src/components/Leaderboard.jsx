// src/components/Leaderboard.jsx
import React from 'react';
import { useContracts } from '../context/ContractContext';
import { Medal } from 'lucide-react';

const Leaderboard = () => {
  const { leaderboard } = useContracts();

  const getMedalEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
      <h2 className="text-lg font-bold mb-4 flex items-center">
        <Medal className="w-5 h-5 mr-2 text-purple-500" />
        Leaderboard
      </h2>
      
      <div className="space-y-2">
        {leaderboard.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No data yet</p>
        ) : (
          leaderboard.map((entry, index) => (
            <div
              key={entry.address}
              className={`flex items-center justify-between p-3 rounded-lg ${
                index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-xl font-bold w-8">{getMedalEmoji(index)}</div>
                <div className="font-mono text-sm">
                  {entry.address.slice(0, 6)}...{entry.address.slice(-4)}
                </div>
              </div>
              <div className="font-bold text-purple-600">{entry.score}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leaderboard;