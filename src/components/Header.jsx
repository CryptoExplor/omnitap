// src/components/Header.jsx
import React from 'react';
import { useAccount } from 'wagmi';
import { Wallet, LogOut } from 'lucide-react';

const Header = () => {
  const { address, isConnected } = useAccount();

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎮</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">OmniTap</h1>
              <p className="text-sm text-purple-200">Multichain Counter Game</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-3 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Wallet className="w-5 h-5" />
                <span className="font-mono">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
              </div>
            ) : (
              <appkit-button />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

// src/components/ChainSelector.jsx
import React from 'react';
import { useAccount, useSwitchChain, useChainId } from 'wagmi';
import { networks } from '../config/wagmi';

const ChainSelector = () => {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { isConnected } = useAccount();

  const currentChain = networks.find(n => n.id === chainId);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
      <h2 className="text-lg font-bold mb-4 flex items-center">
        <span className="text-2xl mr-2">🌐</span>
        Select Blockchain
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {networks.map((network) => (
          <button
            key={network.id}
            onClick={() => isConnected && switchChain?.({ chainId: network.id })}
            disabled={!isConnected}
            className={`p-4 rounded-lg border-2 transition-all ${
              chainId === network.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            } ${!isConnected && 'opacity-50 cursor-not-allowed'}`}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">⛓️</div>
              <div className="font-semibold text-sm">{network.name}</div>
            </div>
          </button>
        ))}
      </div>
      
      {!isConnected && (
        <p className="text-sm text-gray-500 mt-3 text-center">
          Connect wallet to switch chains
        </p>
      )}
    </div>
  );
};

// src/components/CounterDisplay.jsx
import React from 'react';
import { useContracts } from '../context/ContractContext';
import { TrendingUp, TrendingDown, Users } from 'lucide-react';

const CounterDisplay = () => {
  const { counter, loading } = useContracts();

  return (
    <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-2xl p-8 text-white">
      <div className="text-center">
        <div className="flex justify-center items-center mb-4">
          <Users className="w-8 h-8 mr-2" />
          <h2 className="text-2xl font-bold">Global Counter</h2>
        </div>
        
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-8 mb-4">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-20 bg-white/30 rounded"></div>
            </div>
          ) : (
            <div className="text-7xl font-black animate-pulse-slow">
              {counter.toLocaleString()}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="bg-white/10 rounded-lg p-3">
            <TrendingUp className="w-5 h-5 mx-auto mb-1" />
            <div className="font-semibold">Increments</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl mb-1">🎯</div>
            <div className="font-semibold">Goal: 1M</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <TrendingDown className="w-5 h-5 mx-auto mb-1" />
            <div className="font-semibold">Decrements</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// src/components/ActionButtons.jsx
import React, { useState } from 'react';
import { useContracts } from '../context/ContractContext';
import { useAccount } from 'wagmi';
import { ArrowUp, ArrowDown, Loader2 } from 'lucide-react';

const ActionButtons = () => {
  const { increment, decrement, loading } = useContracts();
  const { isConnected } = useAccount();
  const [txHash, setTxHash] = useState('');
  const [message, setMessage] = useState('');

  const handleIncrement = async () => {
    try {
      setMessage('');
      const hash = await increment();
      setTxHash(hash);
      setMessage('✅ Incremented successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    }
  };

  const handleDecrement = async () => {
    try {
      setMessage('');
      const hash = await decrement();
      setTxHash(hash);
      setMessage('✅ Decremented successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
      <h2 className="text-lg font-bold mb-4">Take Action</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <button
          onClick={handleIncrement}
          disabled={!isConnected || loading}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 disabled:scale-100 flex items-center justify-center space-x-2 shadow-lg"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <ArrowUp className="w-5 h-5" />
              <span>Increment</span>
            </>
          )}
        </button>
        
        <button
          onClick={handleDecrement}
          disabled={!isConnected || loading}
          className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 disabled:scale-100 flex items-center justify-center space-x-2 shadow-lg"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <ArrowDown className="w-5 h-5" />
              <span>Decrement</span>
            </>
          )}
        </button>
      </div>
      
      {message && (
        <div className={`p-3 rounded-lg text-sm ${
          message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}
      
      {!isConnected && (
        <div className="text-center text-gray-500 text-sm">
          Connect wallet to start tapping
        </div>
      )}
      
      <div className="mt-4 p-3 bg-purple-50 rounded-lg text-sm">
        <div className="font-semibold mb-1">Fee: 0.00001 ETH/token per tap</div>
        <div className="text-gray-600">10% referral rewards on referred users' fees</div>
      </div>
    </div>
  );
};

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

// src/components/Achievements.jsx
import React from 'react';
import { Award } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    { name: 'First Tap', emoji: '👆', unlocked: false },
    { name: '10 Taps', emoji: '🔟', unlocked: false },
    { name: '100 Taps', emoji: '💯', unlocked: false },
    { name: 'Week Streak', emoji: '📅', unlocked: false },
    { name: 'Referral Pro', emoji: '🤝', unlocked: false },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
      <h2 className="text-lg font-bold mb-4 flex items-center">
        <Award className="w-5 h-5 mr-2 text-purple-500" />
        Achievements
      </h2>
      
      <div className="grid grid-cols-3 gap-3">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className={`text-center p-3 rounded-lg ${
              achievement.unlocked ? 'bg-purple-50' : 'bg-gray-100 opacity-50'
            }`}
          >
            <div className="text-3xl mb-1">{achievement.emoji}</div>
            <div className="text-xs font-semibold">{achievement.name}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-500 text-center">
        Complete actions to unlock achievements!
      </div>
    </div>
  );
};

export { Header, ChainSelector, CounterDisplay, ActionButtons, UserStats, Leaderboard, Achievements };