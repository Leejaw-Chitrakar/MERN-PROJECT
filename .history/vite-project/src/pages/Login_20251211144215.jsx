// Example: src/pages/Login.jsx
import { loginUser } from '../api/auth';

import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser(email, password);
    if (result.authtoken) {
      localStorage.setItem('accessToken', result.authtoken);
      // Redirect or update UI
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
      {error && <div>{error}</div>}
    </form>
  );
}

export default Login;