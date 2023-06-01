import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Account, Client } from 'appwrite';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [signupMode, setSignupMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const client = new Client();
      client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('646b7e969f402554bf1c');
      const account = new Account(client);

      if (signupMode) {
        const response = await account.create(email, password, username);
        console.log('User signed up successfully:', response);
      } else {
        const response = await account.createSession(email, password);
        console.log('User logged in successfully:', response);
      }

      navigate('/dashboard');
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setSignupMode((prevMode) => !prevMode);
    setError('');
  };

  return (
    <div className="login-container">
      <h1 className="main-header">Welcome to Bikimedia</h1>
      <h2 className="login-header">{signupMode ? 'Signup' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {signupMode && (
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Loading...' : signupMode ? 'Signup' : 'Login'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p className="toggle-mode">
        {signupMode ? 'Already have an account?' : "Don't have an account?"}
        <button type="button" onClick={toggleMode}>
          {signupMode ? 'Login' : 'Signup'}
        </button>
      </p>
    </div>
  );
}

export default Login;
