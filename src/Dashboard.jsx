import React, { useState } from 'react';
import Friends from './Friends';
import Chat from './Chat';

function Dashboard() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [showProfile, setShowProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('chatapp_user')));
  const [profileData, setProfileData] = useState({
    email: user?.email || '',
    name: user?.name || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: ''
  });
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('chatapp_user');
    window.location.reload();
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, ...profileData };
    localStorage.setItem('chatapp_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.currentPassword === user.password) {
      const updatedUser = { ...user, password: passwordData.newPassword };
      localStorage.setItem('chatapp_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setMessage('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '' });
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('Current password is incorrect!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const buttonStyle = {
    padding: '12px 20px',
    margin: '8px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const primaryButton = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: 'white'
  };

  const successButton = {
    ...buttonStyle,
    backgroundColor: '#28a745',
    color: 'white'
  };

  const warningButton = {
    ...buttonStyle,
    backgroundColor: '#ffc107',
    color: '#212529'
  };

  const dangerButton = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    color: 'white'
  };

  const secondaryButton = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
    color: 'white'
  };

  const renderContent = () => {
    if (currentView === 'friends') return <Friends />;
    if (currentView === 'chat') return <Chat />;
    
    // Dashboard main view
    return (
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '80vh',
        padding: '30px',
        borderRadius: '15px',
        color: 'white'
      }}>
        {!showProfile && !showChangePassword && (
          <div style={{
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h3 style={{
              fontSize: '32px',
              marginBottom: '40px',
              fontWeight: 'bold'
            }}>Main Dashboard</h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginBottom: '40px'
            }}>
              <button 
                style={primaryButton}
                onClick={() => setCurrentView('friends')}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Manage Friends
              </button>
              
              <button 
                style={successButton}
                onClick={() => setCurrentView('chat')}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Open Chat
              </button>
              
              <button 
                style={warningButton}
                onClick={() => setShowProfile(true)}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Edit Profile
              </button>
              
              <button 
                style={secondaryButton}
                onClick={() => setShowChangePassword(true)}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Change Password
              </button>
            </div>
            
            <button 
              style={dangerButton}
              onClick={handleLogout}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Logout
            </button>
          </div>
        )}

        {showProfile && (
          <div style={{
            maxWidth: '400px',
            margin: '0 auto',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '30px',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{
              textAlign: 'center',
              marginBottom: '25px',
              fontSize: '24px'
            }}>Edit Profile</h3>
            
            <form onSubmit={handleProfileSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>Name:</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: '#333',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter your name"
                />
              </div>
              
              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>Email:</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: '#333',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter your email"
                />
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{...successButton, flex: 1}}>
                  Update Profile
                </button>
                <button type="button" style={{...secondaryButton, flex: 1}} onClick={() => setShowProfile(false)}>
                  ← Back
                </button>
              </div>
            </form>
          </div>
        )}

        {showChangePassword && (
          <div style={{
            maxWidth: '400px',
            margin: '0 auto',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '30px',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{
              textAlign: 'center',
              marginBottom: '25px',
              fontSize: '24px'
            }}>Change Password</h3>
            
            <form onSubmit={handlePasswordSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>Current Password:</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: '#333',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter current password"
                />
              </div>
              
              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>New Password:</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: '#333',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter new password"
                />
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{...warningButton, flex: 1}}>
                  Change Password
                </button>
                <button type="button" style={{...secondaryButton, flex: 1}} onClick={() => setShowChangePassword(false)}>
                  ← Back
                </button>
              </div>
            </form>
          </div>
        )}

        {message && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            backgroundColor: message.includes('successfully') ? '#28a745' : '#dc3545',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000
          }}>
            {message.includes('successfully') ? '' : ''} {message}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '30px',
        fontSize: '36px',
        fontWeight: 'bold',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
         Welcome to Dashboard
      </h2>
      
      {/* Navigation */}
      {currentView !== 'dashboard' && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button 
            style={primaryButton}
            onClick={() => setCurrentView('dashboard')}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            ← Back to Dashboard
          </button>
        </div>
      )}
      
      {renderContent()}
    </div>
  );
}

export default Dashboard;
