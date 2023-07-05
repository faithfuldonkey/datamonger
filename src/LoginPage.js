import React from 'react';

function LoginPage({ onLogin }) {
  return (
    <div>
      <h1>Welcome to the app!</h1>
      <button onClick={onLogin}>Connect Calendar</button>
    </div>
  );
}

export default LoginPage;