import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useSocket } from '../../contexts/SocketContext';

const BACKEND_URL = 'https://ai-video-backend.onrender.com'; // ← Your actual Render URL
  const [script, setScript] = useState('');
  const [template, setTemplate] = useState('presenter1');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { updateStatus } = useSocket();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    updateStatus('Generating...');
    try {
      // Mock API call (update to real backend later)
      await new Promise(resolve => setTimeout(resolve, 2000));  // Fake delay
      updateStatus('Done! Video ready.');
      alert('Mock generation started!');
    } catch (error) {
      updateStatus('Error occurred.');
      alert('Mock error: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <h3>Upload Script</h3>
      <textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        placeholder="Paste nature script..."
        rows={4}
        required
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <select value={template} onChange={(e) => setTemplate(e.target.value)} style={{ marginBottom: '10px' }}>
        <option value="presenter1">Adventurer</option>
        <option value="presenter2">Expert</option>
      </select>
      <button type="submit" disabled={loading} style={{ padding: '5px 10px' }}>
        {loading ? 'Generating...' : 'Start Generation'}
      </button>
      <p>Status: <strong>{/* Status from context */}</strong></p>  {/* Update later */}
    </form>
  );
};

export default AutoUploadForm;