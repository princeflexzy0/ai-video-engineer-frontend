import React, { useState, useEffect } from 'react';
import { useSocket } from '../../contexts/SocketContext';

function AutoUploadForm() {
  const [script, setScript] = useState('');
  const [template, setTemplate] = useState('presenter1');
  const [status, setStatus] = useState('');
  const [videoId, setVideoId] = useState(null);
  const [progress, setProgress] = useState(null);
  const { videoStatus, isConnected } = useSocket();

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://ai-video-engineer-backend.onrender.com';

  useEffect(() => {
    if (!videoId || isConnected) return;
    const pollStatus = setInterval(async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/video-status/${videoId}`);
        if (response.ok) {
          const data = await response.json();
          setProgress(data);
          if (data.status === 'completed' || data.status === 'failed') {
            clearInterval(pollStatus);
          }
        }
      } catch (error) {
        console.log('Polling error:', error);
      }
    }, 3000);
    return () => clearInterval(pollStatus);
  }, [videoId, isConnected, BACKEND_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    setProgress(null);
    try {
      const response = await fetch(`${BACKEND_URL}/generate-video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script: script, template: template, userId: 'guest@example.com' })
      });
      const data = await response.json();
      if (response.ok) {
        setVideoId(data.id);
        setStatus(`Video generation started! ID: ${data.id}`);
      } else {
        setStatus(`Error: ${data.message || 'Failed to start'}`);
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  const currentProgress = videoStatus?.id === videoId ? videoStatus : progress;

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h3>Generate AI Video</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Video Script:</label>
          <textarea value={script} onChange={(e) => setScript(e.target.value)} placeholder="Enter your video script here..." required rows="6" style={{ width: '100%', padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ddd' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Template:</label>
          <select value={template} onChange={(e) => setTemplate(e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ddd' }}>
            <option value="presenter1">Presenter 1</option>
            <option value="presenter2">Presenter 2</option>
            <option value="presenter3">Presenter 3</option>
          </select>
        </div>
        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Generate Video</button>
      </form>
      {status && <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}><p style={{ margin: 0 }}>{status}</p></div>}
      {currentProgress && <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f5e9', borderRadius: '4px' }}><h4 style={{ marginTop: 0 }}>Progress:</h4><p><strong>Status:</strong> {currentProgress.status}</p>{currentProgress.current_step && <p><strong>Step:</strong> {currentProgress.current_step}</p>}{currentProgress.progress !== undefined && <div style={{ marginTop: '10px' }}><div style={{ width: '100%', backgroundColor: '#ddd', borderRadius: '10px', height: '20px' }}><div style={{ width: `${currentProgress.progress}%`, backgroundColor: '#4caf50', height: '100%', borderRadius: '10px', transition: 'width 0.3s ease' }}></div></div><p style={{ textAlign: 'center', marginTop: '5px' }}>{currentProgress.progress}%</p></div>}</div>}
    </div>
  );
}

export default AutoUploadForm;
