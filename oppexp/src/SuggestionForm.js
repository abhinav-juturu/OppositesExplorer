import React, { Component } from 'react';
import './App.css'; // Re-use the existing styles

class SuggestionForm extends Component {
  constructor(props) {
    super(props);
    // satisfying 'State Management' in a Class Component
    this.state = {
      word: '',
      opposite: '',
      submitted: false
    };
  }

  // satisfying 'Event' handling
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    this.setState({ submitted: true });
    // In a real app, this would send data to a backend
    console.log(`Submitted: ${this.state.word} vs ${this.state.opposite}`);
  };

  render() {
    return (
      <div className="main-container" style={{ textAlign: 'center', color: 'var(--text)' }}>
        <h2>📝 Suggest a New Pair</h2>
        <p>Help us add more words to the game!</p>

        {this.state.submitted ? (
          <div className="card correct" style={{ padding: '20px', maxWidth: '400px', margin: '20px auto' }}>
            <h3>Thank you! 🎉</h3>
            <p>We received: {this.state.word} ↔ {this.state.opposite}</p>
            <button className="btn" onClick={() => this.setState({ submitted: false, word: '', opposite: '' })}>Add Another</button>
          </div>
        ) : (
          <form onSubmit={this.handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            <div style={{ textAlign: 'left' }}>
              <label>First Word:</label>
              <input 
                type="text" 
                name="word" 
                value={this.state.word} 
                onChange={this.handleChange} 
                required 
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid var(--border)' }}
              />
            </div>

            <div style={{ textAlign: 'left' }}>
              <label>Opposite Word:</label>
              <input 
                type="text" 
                name="opposite" 
                value={this.state.opposite} 
                onChange={this.handleChange} 
                required 
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid var(--border)' }}
              />
            </div>

            <button type="submit" className="btn btn-active">Submit Suggestion</button>
          </form>
        )}
      </div>
    );
  }
}

export default SuggestionForm;