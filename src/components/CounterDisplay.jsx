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

export default CounterDisplay;