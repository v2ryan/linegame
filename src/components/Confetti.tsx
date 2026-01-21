import React from 'react';

const Confetti: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-50">
      <div className="animate-bounce text-6xl drop-shadow-lg">🎉 ⭐ 🏆</div>
    </div>
  );
};

export default Confetti;
