const { useState, useEffect } = React;

const DATA = [
  { id: 1, a: 'Hot', b: 'Cold', aniA: 'ani-hot', aniB: 'ani-cold' },
  { id: 2, a: 'Big', b: 'Small', aniA: 'ani-big', aniB: 'ani-small' },
  { id: 3, a: 'Fast', b: 'Slow', aniA: 'ani-fast', aniB: 'ani-slow' },
  { id: 4, a: 'Heavy', b: 'Light', aniA: 'ani-heavy', aniB: 'ani-light' },
  { id: 5, a: 'Up', b: 'Down', aniA: 'ani-up', aniB: 'ani-down' },
  { id: 6, a: 'Loud', b: 'Quiet', aniA: 'ani-loud', aniB: 'ani-quiet' },
  { id: 7, a: 'Bright', b: 'Dark', aniA: 'ani-hot', aniB: 'ani-slow' },
  { id: 8, a: 'Happy', b: 'Sad', aniA: 'ani-big', aniB: 'ani-small' },
  { id: 9, a: 'Open', b: 'Closed', aniA: '', aniB: '' },
  { id: 10, a: 'Day', b: 'Night', aniA: 'ani-hot', aniB: 'ani-slow' },
  { id: 11, a: 'Wet', b: 'Dry', aniA: 'ani-light', aniB: '' },
  { id: 12, a: 'Full', b: 'Empty', aniA: 'ani-big', aniB: 'ani-quiet' },
  { id: 13, a: 'Hard', b: 'Soft', aniA: 'ani-heavy', aniB: 'ani-light' },
  { id: 14, a: 'In', b: 'Out', aniA: 'ani-small', aniB: 'ani-big' },
  { id: 15, a: 'Push', b: 'Pull', aniA: 'ani-fast', aniB: 'ani-slow' },
  { id: 16, a: 'Tall', b: 'Short', aniA: 'ani-up', aniB: 'ani-small' },
  { id: 17, a: 'Clean', b: 'Dirty', aniA: 'ani-light', aniB: '' },
  { id: 18, a: 'Near', b: 'Far', aniA: 'ani-big', aniB: 'ani-small' },
  { id: 19, a: 'Front', b: 'Back', aniA: '', aniB: '' },
  { id: 20, a: 'Thick', b: 'Thin', aniA: 'ani-heavy', aniB: 'ani-small' },
  { id: 21, a: 'Brave', b: 'Scared', aniA: 'ani-big', aniB: 'ani-cold' },
  { id: 22, a: 'On', b: 'Off', aniA: 'ani-hot', aniB: '' },
  { id: 23, a: 'Smooth', b: 'Rough', aniA: '', aniB: 'ani-heavy' },
  { id: 24, a: 'Above', b: 'Below', aniA: 'ani-up', aniB: 'ani-down' },
  { id: 25, a: 'Sweet', b: 'Sour', aniA: 'ani-hot', aniB: 'ani-cold' },
  { id: 26, a: 'Strong', b: 'Weak', aniA: 'ani-big', aniB: 'ani-small' },
  { id: 27, a: 'New', b: 'Old', aniA: '', aniB: 'ani-slow' },
  { id: 28, a: 'Wide', b: 'Narrow', aniA: 'ani-big', aniB: 'ani-small' },
  { id: 30, a: 'Win', b: 'Lose', aniA: 'ani-hot', aniB: 'ani-small' }
];

function Card({ item, mode, onClick, isCorrect, speak }) {
  const [flipped, setFlipped] = useState(false);
  const word = mode === 'quiz' ? item.b : (flipped ? item.b : item.a);
  const ani = mode === 'quiz' ? item.aniB : (flipped ? item.aniB : item.aniA);

  return (
    <div className={`card ${isCorrect ? 'correct' : ''}`}
      onClick={() => { if (mode === 'practice') { setFlipped(!flipped); speak(!flipped ? item.b : item.a); } onClick(); }}>
      <div className={ani}>{word}</div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState('light');
  const [mode, setMode] = useState('practice');
  const [completed, setCompleted] = useState([]);
  const [currentTarget, setCurrentTarget] = useState(null);

  useEffect(() => { document.body.setAttribute('data-theme', theme); }, [theme]);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 0.8;
    window.speechSynthesis.speak(msg);
  };

  const startQuiz = (doneList) => {
    const remaining = DATA.filter(d => !doneList.includes(d.id));
    if (remaining.length === 0) {
      speak("Amazing! You found all 30 opposites!");
      setMode('practice');
      setCompleted([]);
    } else {
      const next = remaining[Math.floor(Math.random() * remaining.length)];
      setCurrentTarget(next);
      speak(`Find the opposite of ${next.a}`);
    }
  };

  const handleCardClick = (item) => {
    if (mode === 'quiz' && item.id === currentTarget.id) {
      const newDone = [...completed, item.id];
      setCompleted(newDone);
      speak(`Correct! ${item.b} is the opposite of ${item.a}`);
      setTimeout(() => startQuiz(newDone), 1500);
    }
  };

  return (
    <div>
      <header className="header">
        <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>OPPOSITES EXPLORER</div>
        <div className="toolbar">
          <button className="btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
          <button className={`btn ${mode === 'practice' ? 'btn-active' : ''}`} onClick={() => { setMode('practice'); setCompleted([]); }}>Practice Mode</button>
          <button className={`btn ${mode === 'quiz' ? 'btn-active' : ''}`} onClick={() => { setMode('quiz'); setCompleted([]); startQuiz([]); }}>Quiz Mode</button>
        </div>
      </header>

      {mode === 'quiz' && currentTarget && (
        <div className="quiz-bar">
          <div className="quiz-prompt">FIND THE OPPOSITE OF:</div>
          <div className={`quiz-target ${currentTarget.aniA}`}>{currentTarget.a}</div>
        </div>
      )}

      <main className="main-container">
        <div className="grid">
          {DATA.map(item => (
            <Card key={item.id} item={item} mode={mode}
              isCorrect={completed.includes(item.id)}
              onClick={() => handleCardClick(item)}
              speak={speak} />
          ))}
        </div>
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);