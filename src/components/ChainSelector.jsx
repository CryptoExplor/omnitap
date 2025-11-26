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

export default ChainSelector;