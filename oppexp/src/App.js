import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SuggestionForm from './SuggestionForm';
import './App.css';

// --- DATA ---
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

// --- SOUND HELPER ---
const playSound = (type) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  if (type === 'correct') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } else if (type === 'wrong') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } else if (type === 'flip') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }
};

// --- CARD COMPONENT ---
function Card({ item, mode, onClick, isCorrect, speak, isWrong }) {
  const [flipped, setFlipped] = useState(false);
  
  const word = mode === 'quiz' ? item.b : (flipped ? item.b : item.a);
  const ani = mode === 'quiz' ? item.aniB : (flipped ? item.aniB : item.aniA);
  const icon = mode === 'quiz' ? item.iconB : (flipped ? item.iconB : item.iconA);

  const handleClick = () => {
    if (mode === 'practice') {
      playSound('flip');
      setFlipped(!flipped); 
      speak(!flipped ? item.b : item.a); 
    }
    onClick();
  };

  const shakeStyle = isWrong ? { animation: 'shake 0.4s ease-in-out' } : {};

  return (
    <div 
      className={`card ${isCorrect ? 'correct' : ''}`}
      style={shakeStyle}
      onClick={handleClick}
    >
      <div className={ani} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.2' }}>
        <span style={{ fontSize: '3rem', marginBottom: '5px' }}>{icon}</span>
        <span>{word}</span>
      </div>
    </div>
  );
}

// --- GAME LOGIC ---
// Note: mode is now passed in as a prop, not managed here!
function Game({ mode, setMode }) {
  const [completed, setCompleted] = useState([]);
  const [currentTarget, setCurrentTarget] = useState(null);
  const [wrongId, setWrongId] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Memoize speak function to avoid recreating every render
  const speak = (text, onEndCallback = null) => {
    window.speechSynthesis.cancel(); 
    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 0.85; 
    msg.pitch = 1.1;
    setIsSpeaking(true);
    msg.onend = () => {
      setIsSpeaking(false);
      if (onEndCallback) onEndCallback();
    };
    window.speechSynthesis.speak(msg);
  };

  const startQuiz = (doneList) => {
    const remaining = DATA.filter(d => !doneList.includes(d.id));
    
    if (remaining.length === 0) {
      playSound('correct');
      speak("Amazing job! You found all the opposites!");
      setMode('practice'); // Go back to practice on finish
      setCompleted([]);
    } else {
      const next = remaining[Math.floor(Math.random() * remaining.length)];
      setCurrentTarget(next);
      speak(`Find the opposite of ${next.a}`);
    }
  };

  // When mode changes (via Nav bar), reset the game state
  useEffect(() => {
    setCompleted([]);
    setCurrentTarget(null);
    setWrongId(null);
    
    // If switching to quiz, start it. If practice, say it.
    if (mode === 'quiz') {
       setTimeout(() => startQuiz([]), 500);
    } else {
       speak("Practice Mode");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const handleCardClick = (item) => {
    if (isSpeaking && mode === 'quiz') return; 

    if (mode === 'quiz' && currentTarget) {
      if (item.id === currentTarget.id) {
        playSound('correct');
        const newDone = [...completed, item.id];
        setCompleted(newDone);
        speak(`Correct! ${item.b} is the opposite of ${item.a}`, () => {
             setTimeout(() => startQuiz(newDone), 500); 
        });
      } else {
        playSound('wrong');
        setWrongId(item.id);
        speak(`Not that one. Try again!`);
        setTimeout(() => setWrongId(null), 500);
      }
    }
  };

  return (
    <div>
      {/* TOOLBAR REMOVED FROM HERE - IT IS NOW IN THE NAVBAR */}

      {mode === 'quiz' && currentTarget && (
        <div className="quiz-bar">
          <div className="quiz-prompt">FIND THE OPPOSITE OF:</div>
          <div className={`quiz-target ${currentTarget.aniA}`} style={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
            <span style={{ fontSize: '3rem', lineHeight: '1' }}>{currentTarget.iconA}</span>
            <span>{currentTarget.a}</span>
          </div>
        </div>
      )}

      <main className="main-container">
        <div className="grid">
          {DATA.map(item => (
            <Card 
              key={item.id} 
              item={item} 
              mode={mode}
              isCorrect={completed.includes(item.id)}
              isWrong={wrongId === item.id}
              onClick={() => handleCardClick(item)}
              speak={speak} 
            />
          ))}
        </div>
      </main>
    </div>
  );
}

// --- MAIN APP WITH GLOBAL NAVIGATION ---
function App() {
  const [theme, setTheme] = useState('light');
  const [mode, setMode] = useState('practice');

  useEffect(() => { document.body.setAttribute('data-theme', theme); }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="app-shell">
        <nav className="header">
          <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>OPPOSITES EXPLORER</div>
          
          <div className="nav-group">
            {/* 1. THEME TOGGLE */}
            <button className="btn" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* 2. PRACTICE BUTTON (Links to home & sets mode) */}
            <Link to="/" onClick={() => setMode('practice')}>
              <button className={`btn ${mode === 'practice' ? 'btn-active' : ''}`}>
                 Practice
              </button>
            </Link>

            {/* 3. QUIZ BUTTON (Links to home & sets mode) */}
            <Link to="/" onClick={() => setMode('quiz')}>
              <button className={`btn ${mode === 'quiz' ? 'btn-active' : ''}`}>
                 Quiz
              </button>
            </Link>

            {/* 4. SUGGEST WORDS (Separate Page) */}
            <Link to="/suggest">
              <button className="btn">📝 Suggest</button>
            </Link>
          </div>
        </nav>

        <Routes>
          {/* Pass mode and setMode down to the Game */}
          <Route path="/" element={<Game mode={mode} setMode={setMode} />} />
          <Route path="/suggest" element={<SuggestionForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;