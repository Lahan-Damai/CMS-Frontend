import React from 'react';

// Inline styles for the spinner
const spinnerStyle = {
  border: '4px solid rgba(0, 0, 0, 0.1)',
  borderLeftColor: '#4a90e2',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  animation: 'spin 1s linear infinite',
};

const spinKeyframes = `
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinner = () => (
  <div className="flex justify-center">
    <style>{spinKeyframes}</style>
    <div style={spinnerStyle}></div>
  </div>
);

export default LoadingSpinner;
