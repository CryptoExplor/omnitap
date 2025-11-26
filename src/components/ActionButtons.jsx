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

export default ActionButtons;