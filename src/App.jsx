import React from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { config, queryClient } from './config/wagmi';
import Header from './components/Header';
import ChainSelector from './components/ChainSelector';
import CounterDisplay from './components/CounterDisplay';
import ActionButtons from './components/ActionButtons';
import UserStats from './components/UserStats';
import Leaderboard from './components/Leaderboard';
import Achievements from './components/Achievements';
import { ContractProvider } from './context/ContractContext';

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ContractProvider>
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <ChainSelector />
                  <CounterDisplay />
                  <ActionButtons />
                </div>
                <div className="space-y-6">
                  <UserStats />
                  <Leaderboard />
                  <Achievements />
                </div>
              </div>
            </main>
          </div>
        </ContractProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;