import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './FlashCard';

const Home = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/flashcards');
      setFlashcards(res.data);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    }
  };

  const showPrevious = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const showNext = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, flashcards.length - 1));
  };

  return (
    <div className="flex flex-col items-center mt-5">
      {flashcards.length > 0 ? (
        <>
          <Flashcard card={flashcards[currentIndex]} />
          <div className="mt-5">
            <button
              onClick={showPrevious}
              disabled={currentIndex === 0}
              className="
                bg-[#1B1A55]
                text-[#FFE5E5]
                px-4
                py-2
                rounded
                mr-2
                disabled:opacity-50
                disabled:cursor-not-allowed
                hover:bg-[#070F2B]
                transition-colors
                duration-300
              "
            >
              Previous
            </button>
            <button
              onClick={showNext}
              disabled={currentIndex === flashcards.length - 1}
              className="
                bg-[#1B1A55]
                text-[#FFE5E5]
                px-4
                py-2
                rounded
                disabled:opacity-50
                disabled:cursor-not-allowed
                hover:bg-[#070F2B]
                transition-colors
                duration-300
              "
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-[#535C91]">No flashcards available.</p>
      )}
    </div>
  );
};

export default Home;
