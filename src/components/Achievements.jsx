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

export default Achievements;