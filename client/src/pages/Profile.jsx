import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Profile.css';

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  if (!user) {
    return (
      <div className="profile-container">
        <div className="not-logged-in">
          <div className="not-logged-icon">🔐</div>
          <h2>Please Login</h2>
          <p>You need to be logged in to view your profile</p>
          <button className="login-btn" onClick={() => navigate('/')}>
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    try {
      // Simulate API call to update profile
      // In a real app, this would call an API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('✅ Profile updated successfully!');
      setIsEditing(false);
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Failed to update profile');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar">👤</div>
          <div className="profile-title">
            <h1>My Profile</h1>
            <p>Manage your account details</p>
          </div>
        </div>

        {/* Message Alert */}
        {message && <div className={`message-alert ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}

        {/* Profile Content */}
        <div className="profile-content">
          {isEditing ? (
            // Edit Mode
            <form className="profile-form">
              <div className="form-section">
                <h3>Personal Information</h3>
                
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    disabled
                  />
                  <small>Email cannot be changed</small>
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    rows="4"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="save-btn"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? '💾 Saving...' : '💾 Save Changes'}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            // View Mode
            <>
              <div className="profile-info">
                <div className="info-section">
                  <h3>Personal Information</h3>
                  
                  <div className="info-item">
                    <span className="label">Full Name</span>
                    <span className="value">{user.name}</span>
                  </div>

                  <div className="info-item">
                    <span className="label">Email Address</span>
                    <span className="value">{user.email}</span>
                  </div>

                  <div className="info-item">
                    <span className="label">Phone Number</span>
                    <span className="value">{formData.phone || 'Not provided'}</span>
                  </div>

                  <div className="info-item">
                    <span className="label">Address</span>
                    <span className="value">{formData.address || 'Not provided'}</span>
                  </div>

                  <div className="info-item">
                    <span className="label">Account Type</span>
                    <span className="value badge">
                      {user.role === 'admin' ? '👑 Admin' : '👤 Customer'}
                    </span>
                  </div>

                  <div className="info-item">
                    <span className="label">Member Since</span>
                    <span className="value">
                      {user.createdAt 
                        ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })
                        : 'Recently'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="profile-actions">
                  <button
                    className="edit-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    ✏️ Edit Profile
                  </button>
                  <button
                    className="orders-btn"
                    onClick={() => navigate('/orders')}
                  >
                    📦 View Orders
                  </button>
                </div>
              </div>

              {/* Account Management */}
              <div className="account-section">
                <h3>Account Management</h3>
                <p>Manage your account security and preferences</p>
                
                <div className="account-actions">
                  <button className="secondary-btn" disabled>
                    🔑 Change Password (Coming Soon)
                  </button>
                  <button className="secondary-btn" disabled>
                    🔔 Notification Settings (Coming Soon)
                  </button>
                </div>

                <div className="danger-zone">
                  <h4>Danger Zone</h4>
                  <button
                    className="logout-btn"
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
