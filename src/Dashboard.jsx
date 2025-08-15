import React, { useState } from 'react';

function Dashboard() {
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

  return (
    <div>
      <h2>Welcome to Dashboard</h2>
      
      {!showProfile && !showChangePassword && (
        <div>
          <button onClick={() => setShowProfile(true)}>Edit Profile</button>
          <button onClick={() => setShowChangePassword(true)}>Change Password</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {showProfile && (
        <div>
          <h3>Edit Profile</h3>
          <form onSubmit={handleProfileSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                required
              />
            </div>
            <button type="submit">Update Profile</button>
            <button type="button" onClick={() => setShowProfile(false)}>Back</button>
          </form>
        </div>
      )}

      {showChangePassword && (
        <div>
          <h3>Change Password</h3>
          <form onSubmit={handlePasswordSubmit}>
            <div>
              <label>Current Password:</label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                required
              />
            </div>
            <div>
              <label>New Password:</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                required
              />
            </div>
            <button type="submit">Change Password</button>
            <button type="button" onClick={() => setShowChangePassword(false)}>Back</button>
          </form>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default Dashboard;
