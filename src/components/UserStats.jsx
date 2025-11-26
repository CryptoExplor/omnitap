// src/components/UserStats.jsx
import React from 'react';
import { useContracts } from '../context/ContractContext';
import { useAccount } from 'wagmi';
import { Trophy, Flame, Target } from 'lucide-react';

const UserStats = () => {
  const { userData } = useContracts();
  const { isConnected } = useAccount();

  const getBadgeTier = (totalActions) => {
    if (totalActions >= 5000) return { name: 'Legendary', emoji: '👑', color: 'text-yellow-500' };
    if (totalActions >= 1000) return { name: 'Diamond', emoji: '💎', color: 'text-blue-500' };
    if (totalActions >= 500) return { name: 'Platinum', emoji: '💿', color: 'text-gray-400' };
    if (totalActions >= 100) return { name: 'Gold', emoji: '🥇', color: 'text-yellow-600' };
    if (totalActions >= 50) return { name: 'Silver', emoji: '🥈', color: 'text-gray-500' };
    if (totalActions >= 10) return { name: 'Bronze', emoji: '🥉', color: 'text-orange-600' };
    return { name: 'Newcomer', emoji: '🆕', color: 'text-gray-600' };
  };

  if (!isConnected) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
        <h2 className="text-lg font-bold mb-4">Your Stats</h2>
        <p className="text-gray-500 text-center py-8">Connect wallet to view stats</p>
      </div>
    );
  }

  const badge = userData ? getBadgeTier(userData.totalActions) : getBadgeTier(0);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
      <h2 className="text-lg font-bold mb-4 flex items-center">
        <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
        Your Stats
      </h2>
      
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 text-center">
          <div className={`text-4xl mb-2 ${badge.color}`}>{badge.emoji}</div>
          <div className="font-bold">{badge.name}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-500">Total Taps</div>
            <div className="text-2xl font-bold text-purple-600">
              {userData?.totalActions || 0}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-500 flex items-center">
              <Flame className="w-4 h-4 mr-1 text-orange-500" />
              Streak
            </div>
            <div className="text-2xl font-bold text-orange-500">
              {userData?.currentStreak || 0}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm">
          <div>
            <div className="text-gray-500">Increments</div>
            <div className="font-bold text-green-600">↑ {userData?.increments || 0}</div>
          </div>
          <div>
            <div className="text-gray-500">Decrements</div>
            <div className="font-bold text-red-600">↓ {userData?.decrements || 0}</div>
          </div>
          <div>
            <div className="text-gray-500">Best Streak</div>
            <div className="font-bold">🔥 {userData?.longestStreak || 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;