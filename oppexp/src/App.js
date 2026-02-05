import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SuggestionForm from './SuggestionForm'; // Import the Class Component
import './App.css';

// ... (KEEP YOUR EXISTING DATA ARRAY HERE - COPY IT FROM PREVIOUS CODE) ...
const DATA = [
  { id: 1, a: 'Hot', b: 'Cold', aniA: 'ani-hot', aniB: 'ani-cold', iconA: '🔥', iconB: '❄️' },
  { id: 2, a: 'Big', b: 'Small', aniA: 'ani-big', aniB: 'ani-small', iconA: '🐘', iconB: '🐜' },
  { id: 3, a: 'Fast', b: 'Slow', aniA: 'ani-fast', aniB: 'ani-slow', iconA: '🚀', iconB: '🐌' },
  { id: 4, a: 'Heavy', b: 'Light', aniA: 'ani-heavy', aniB: 'ani-light', iconA: '🏋️', iconB: '🪶' },
  { id: 5, a: 'Up', b: 'Down', aniA: 'ani-up', aniB: 'ani-down', iconA: '⬆️', iconB: '⬇️' },
  { id: 6, a: 'Loud', b: 'Quiet', aniA: 'ani-loud', aniB: 'ani-quiet', iconA: '📢', iconB: '🤫' },
  { id: 7, a: 'Bright', b: 'Dark', aniA: 'ani-hot', aniB: 'ani-slow', iconA: '☀️', iconB: '🌑' },
  { id: 8, a: 'Happy', b: 'Sad', aniA: 'ani-big', aniB: 'ani-small', iconA: '😊', iconB: '😢' },
  { id: 9, a: 'Open', b: 'Closed', aniA: '', aniB: '', iconA: '🔓', iconB: '🔒' },
  { id: 10, a: 'Day', b: 'Night', aniA: 'ani-hot', aniB: 'ani-slow', iconA: '🏙️', iconB: '🌃' },
  { id: 11, a: 'Wet', b: 'Dry', aniA: 'ani-light', aniB: '', iconA: '💧', iconB: '🌵' },
  { id: 12, a: 'Full', b: 'Empty', aniA: 'ani-big', aniB: 'ani-quiet', iconA: '🔋', iconB: '🪫' },
  { id: 13, a: 'Hard', b: 'Soft', aniA: 'ani-heavy', aniB: 'ani-light', iconA: '💎', iconB: '🧸' },
  { id: 14, a: 'In', b: 'Out', aniA: 'ani-small', aniB: 'ani-big', iconA: '📥', iconB: '📤' },
  { id: 15, a: 'Push', b: 'Pull', aniA: 'ani-fast', aniB: 'ani-slow', iconA: '🫸', iconB: '🫷' },
  { id: 16, a: 'Tall', b: 'Short', aniA: 'ani-up', aniB: 'ani-small', iconA: '🦒', iconB: '🐞' },
  { id: 17, a: 'Clean', b: 'Dirty', aniA: 'ani-light', aniB: '', iconA: '✨', iconB: '🐷' },
  { id: 18, a: 'Near', b: 'Far', aniA: 'ani-big', aniB: 'ani-small', iconA: '👋', iconB: '🔭' },
  { id: 19, a: 'Front', b: 'Back', aniA: '', aniB: '', iconA: '👀', iconB: '🔙' },
  { id: 20, a: 'Thick', b: 'Thin', aniA: 'ani-heavy', aniB: 'ani-small', iconA: '📕', iconB: '🔖' },
  { id: 21, a: 'Brave', b: 'Scared', aniA: 'ani-big', aniB: 'ani-cold', iconA: '🦁', iconB: '😱' },
  { id: 22, a: 'On', b: 'Off', aniA: 'ani-hot', aniB: '', iconA: '💡', iconB: '⚫' },
  { id: 23, a: 'Smooth', b: 'Rough', aniA: '', aniB: 'ani-heavy', iconA: '🎱', iconB: '🧱' },
  { id: 24, a: 'Above', b: 'Below', aniA: 'ani-up', aniB: 'ani-down', iconA: '🚁', iconB: '👇' },
  { id: 25, a: 'Sweet', b: 'Sour', aniA: 'ani-hot', aniB: 'ani-cold', iconA: '🍭', iconB: '🍋' },
  { id: 26, a: 'Strong', b: 'Weak', aniA: 'ani-big', aniB: 'ani-small', iconA: '💪', iconB: '🥀' },
  { id: 27, a: 'New', b: 'Old', aniA: '', aniB: 'ani-slow', iconA: '🎁', iconB: '🕸️' },
  { id: 28, a: 'Wide', b: 'Narrow', aniA: 'ani-big', aniB: 'ani-small', iconA: '↔️', iconB: '🤏' },
  { id: 30, a: 'Win', b: 'Lose', aniA: 'ani-hot', aniB: 'ani-small', iconA: '🏆', iconB: '💔' }
];

// --- SOUND GENERATOR (Keep existing code) ---
const playSound = (type) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  // ... (Paste your existing sound logic here) ...
  if (type === 'correct') { /* ... */ } 
  // Just use the sound logic from the previous code block I gave you
};

// ... (Keep existing Card Component) ...
function Card({ item, mode, onClick, isCorrect, speak, isWrong }) {
  // ... (Paste existing Card logic) ...
  return <div className="card">...</div>; // Placeholder for brevity
}

// --- MAIN GAME COMPONENT (Refactored for Routing) ---
function Game() {
  const [theme, setTheme] = useState('light');
  const [mode, setMode] = useState('practice');
  const [completed, setCompleted] = useState([]);
  const [currentTarget, setCurrentTarget] = useState(null);
  const [wrongId, setWrongId] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => { document.body.setAttribute('data-theme', theme); }, [theme]);

  // ... (Include your speak, startQuiz, and handleCardClick functions here) ...

  return (
    <div>
       {/* Game UI Code goes here (The grid, the buttons, etc.) */}
       {/* Use the exact JSX from the previous App() function return statement */}
       <div className="toolbar">
         {/* Theme/Mode buttons */}
       </div>
       <div className="grid">
         {/* Mapped Cards */}
       </div>
    </div>
  );
}

// --- NEW APP SHELL WITH ROUTING ---
function App() {
  return (
    <Router>
      <div className="app-shell">
        <nav className="header">
          <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>OPPOSITES EXPLORER</div>
          <div>
            {/* NAVIGATION LINKS for Routing Requirement */}
            <Link to="/" className="btn">🎮 Play Game</Link>
            <Link to="/suggest" className="btn">📝 Suggest Words</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/suggest" element={<SuggestionForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;