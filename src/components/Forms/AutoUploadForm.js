import React, { useState, useEffect } from 'react';

function AutoUploadForm() {
  const [script, setScript] = useState('');
  const [template, setTemplate] = useState('presenter1');
  const [status, setStatus] = useState('');
  const [videoId, setVideoId] = useState(null);
  const [progress, setProgress] = useState(null);

  const BACKEND_URL = 'https://ai-video-engineer-backend.onrender.com';

  useEffect(() => {
    if (!videoId) return;

    console.log('Starting to poll for video:', videoId);

    const pollStatus = setInterval(async () => {
      try {
        console.log('Polling video status...');
        const response = await fetch(`${BACKEND_URL}/video-status/${videoId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Status update:', data);
          setProgress(data);
          
          if (data.status === 'completed' || data.status === 'failed') {
            console.log('Video processing complete!');
            clearInterval(pollStatus);
          }
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 2000); // Poll every 2 seconds

    return () => clearInterval(pollStatus);
  }, [videoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    setProgress(null);

    try {
      const response = await fetch(`${BACKEND_URL}/generate-video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          script: script,
          template: template,
          userId: 'guest@example.com'
        })
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

  return (
    <div style={{ maxWidth: '700px', margin: '20px auto', padding: '30px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
      <h3 style={{ marginBottom: '25px', fontSize: '24px', color: '#333' }}>Generate AI Video</h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '15px', color: '#555' }}>Video Script:</label>
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="Enter your video script here..."
            required
            rows="7"
            style={{ 
              width: '100%', 
              padding: '12px', 
              fontSize: '15px', 
              borderRadius: '6px', 
              border: '2px solid #ddd',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '15px', color: '#555' }}>Template:</label>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '12px', 
              fontSize: '15px', 
              borderRadius: '6px', 
              border: '2px solid #ddd',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="presenter1">Presenter 1</option>
            <option value="presenter2">Presenter 2</option>
            <option value="presenter3">Presenter 3</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '17px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#5568d3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}
        >
          Generate Video
        </button>
      </form>

      {status && (
        <div style={{ marginTop: '25px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
          <p style={{ margin: 0, fontSize: '15px' }}>{status}</p>
          <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#666' }}>
            ⏱️ Status updates every 2 seconds
          </p>
        </div>
      )}

      {progress && (
        <div style={{ marginTop: '25px', padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '8px', border: '2px solid #e3f2fd' }}>
          <h4 style={{ marginTop: 0, marginBottom: '15px', fontSize: '18px', color: '#333' }}>📹 Video Progress</h4>
          
          <div style={{ marginBottom: '15px' }}>
            <p style={{ margin: '0 0 5px 0', fontSize: '15px' }}>
              <strong>Status:</strong> <span style={{ color: progress.status === 'completed' ? '#28a745' : '#667eea' }}>{progress.status}</span>
            </p>
            {progress.current_step && (
              <p style={{ margin: '5px 0', fontSize: '15px' }}>
                <strong>Current Step:</strong> {progress.current_step}
              </p>
            )}
          </div>

          {progress.progress !== undefined && (
            <div style={{ marginTop: '15px' }}>
              <div style={{ 
                width: '100%', 
                backgroundColor: '#e0e0e0', 
                borderRadius: '12px', 
                height: '28px',
                overflow: 'hidden',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  width: `${progress.progress}%`,
                  backgroundColor: progress.status === 'completed' ? '#28a745' : '#667eea',
                  height: '100%',
                  borderRadius: '12px',
                  transition: 'width 0.5s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>
                  {progress.progress}%
                </div>
              </div>
            </div>
          )}
          
          {progress.status === 'completed' && progress.video_url && (
            <div style={{ 
              marginTop: '25px', 
              padding: '25px', 
              backgroundColor: '#d4edda', 
              borderRadius: '10px', 
              border: '3px solid #28a745',
              boxShadow: '0 4px 8px rgba(40,167,69,0.2)'
            }}>
              <h3 style={{ 
                margin: '0 0 20px 0', 
                color: '#155724', 
                fontSize: '22px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                ✅ Video Generation Complete!
              </h3>
              
              <div style={{
                padding: '15px',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #c3e6cb',
                marginBottom: '15px'
              }}>
                <p style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 'bold', color: '#155724' }}>
                  📎 Video URL:
                </p>
                <a 
                  href={progress.video_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    color: '#667eea',
                    textDecoration: 'underline',
                    fontSize: '15px',
                    wordBreak: 'break-all',
                    display: 'block'
                  }}
                >
                  {progress.video_url}
                </a>
              </div>
              
              <div style={{
                padding: '12px',
                backgroundColor: '#fff3cd',
                borderRadius: '6px',
                border: '1px solid #ffc107'
              }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#856404' }}>
                  📝 <strong>Note:</strong> This is a mock URL for demonstration purposes. 
                  In production mode with API keys configured, this will be a real, downloadable video file.
                </p>
              </div>
            </div>
          )}

          {progress.status === 'failed' && (
            <div style={{ 
              marginTop: '20px', 
              padding: '20px', 
              backgroundColor: '#f8d7da', 
              borderRadius: '8px', 
              border: '2px solid #dc3545' 
            }}>
              <p style={{ margin: 0, color: '#721c24', fontWeight: 'bold' }}>
                ❌ Video generation failed
              </p>
              {progress.error && (
                <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#721c24' }}>
                  Error: {progress.error}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AutoUploadForm;
