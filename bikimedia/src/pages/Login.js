import React, { useState } from 'react';
import './Login.css'; // Import the CSS file for the component

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupMode, setSignupMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signupMode) {
      // Perform signup logic here
      console.log('Signing up with:', username, password);
    } else {
      // Perform login logic here
      console.log('Logging in with:', username, password);
    }
    // Reset form fields
    setUsername('');
    setPassword('');
  };

  const toggleMode = () => {
    setSignupMode((prevMode) => !prevMode);
  };

  return (
    <div className="login-container">
      <h1 className="main-header">Welcome to Bikimedia</h1>
      <h2 className="login-header">{signupMode ? 'Signup' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">
          {signupMode ? 'Signup' : 'Login'}
        </button>
      </form>
      <p className="toggle-mode">
        {signupMode ? 'Already have an account?' : 'Don\'t have an account?'}
        <button type="button" onClick={toggleMode}>
          {signupMode ? 'Login' : 'Signup'}
        </button>
      </p>
    </div>
  );
}

export default Login;
