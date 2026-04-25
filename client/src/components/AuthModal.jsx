import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import './AuthModal.css';

export default function AuthModal({ mode, onClose, onSwitchMode }) {
  const [currentMode, setCurrentMode] = useState(mode === 'login' ? 'login' : 'register');
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('demo123');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register } = useContext(AuthContext);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      if (result.token || result.user) {
        onClose();
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const result = await register(name, email, password);
      if (result.token || result.user) {
        onClose();
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError('Network error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="close-btn" onClick={onClose}>
          ✕
        </button>

        {currentMode === 'login' ? (
          <>
            <h2>Welcome Back</h2>
            <p className="auth-subtitle">Login to your account</p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p className="auth-footer">
              Don't have an account?{' '}
              <button
                type="button"
                className="link-btn"
                onClick={() => {
                  setCurrentMode('register');
                  setError('');
                }}
              >
                Register
              </button>
            </p>

            <div className="demo-hint">
              <strong>Demo Account</strong>
              <p>📧 demo@example.com</p>
              <p>🔐 demo123</p>
            </div>
          </>
        ) : (
          <>
            <h2>Create Account</h2>
            <p className="auth-subtitle">Join us today</p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Creating...' : 'Register'}
              </button>
            </form>

            <p className="auth-footer">
              Already have an account?{' '}
              <button
                type="button"
                className="link-btn"
                onClick={() => {
                  setCurrentMode('login');
                  setError('');
                }}
              >
                Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
