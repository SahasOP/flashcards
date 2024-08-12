import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './FlashCard';

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [form, setForm] = useState({ question: '', answer: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const res = await axios.get('https://flashcards-api-five.vercel.app/api/flashcards');
      setFlashcards(res.data);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editMode) {
        await axios.put(`https://flashcards-api-five.vercel.app/api/flashcards/${currentCard.id}`, form);
        setEditMode(false);
        setCurrentCard(null);
      } else {
        await axios.post('https://flashcards-api-five.vercel.app/api/flashcards', form);
      }
      setForm({ question: '', answer: '' });
      fetchFlashcards();
    } catch (error) {
      console.error('Error saving flashcard:', error);
    }
  };

  const handleEdit = (card) => {
    setForm({ question: card.question, answer: card.answer });
    setEditMode(true);
    setCurrentCard(card);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://flashcards-api-five.vercel.app/api/flashcards/${id}`);
      fetchFlashcards();
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full mt-5">
      <form onSubmit={handleSubmit} className="mb-5 flex flex-col items-center space-y-2">
        <input
          type="text"
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
          placeholder="Question"
          required
          className="text-[#070F2B] border border-[#1B1A55] p-2 rounded"
        />
        <input
          type="text"
          value={form.answer}
          onChange={(e) => setForm({ ...form, answer: e.target.value })}
          placeholder="Answer"
          required
          className="text-[#070F2B] border border-[#1B1A55] p-2 rounded"
        />
        <button
          type="submit"
          className="bg-[#1B1A55] text-[#FFE5E5] px-4 py-2 rounded hover:bg-[#070F2B]"
        >
          {editMode ? 'Update Flashcard' : 'Add Flashcard'}
        </button>
      </form>

      {flashcards.length > 0 ? (
        <div className="flex p-8 flex-wrap justify-center gap-4 w-full">
          {flashcards.map((card) => (
            <div key={card.id} className="relative bg-[#FFE5E5] shadow-lg rounded-lg p-8">
              <Flashcard card={card} />
              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={() => handleEdit(card)}
                  className="bg-[#9290C3] text-[#070F2B] px-4 py-2 rounded-lg hover:bg-[#535C91]"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="bg-[#070F2B] text-[#FFE5E5] px-4 py-2 rounded-lg hover:bg-[#1B1A55]"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[#535C91]">No flashcards available.</p>
      )}
    </div>
  );
};

export default Dashboard;
