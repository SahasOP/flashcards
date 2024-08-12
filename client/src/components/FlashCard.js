import React, { useState, useEffect } from 'react';
import './Flashcard.css'; // Import the custom CSS for additional styles

const Flashcard = ({ card }) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false); // Reset flip state when card changes
  }, [card]);

  if (!card) {
    return null; // Ensure card is defined before attempting to use it
  }

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="flashcard-container"
    >
      <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
        <div className="flashcard-front bg-[#FFE5E5] text-[#070F2B] flex items-center justify-center text-center p-4 border border-[#1B1A55] rounded-xl">
          {card.question}
        </div>
        <div className="flashcard-back bg-[#9290C3] text-[#070F2B] flex items-center justify-center text-center p-4 border border-[#1B1A55] rounded-xl">
          {card.answer}
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
