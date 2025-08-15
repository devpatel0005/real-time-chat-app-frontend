import React, { useState, useEffect } from 'react';

function Friends() {
  const [friends, setFriends] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // Load friends and blocked users from localStorage
    const savedFriends = JSON.parse(localStorage.getItem('chatapp_friends') || '[]');
    const savedBlocked = JSON.parse(localStorage.getItem('chatapp_blocked') || '[]');
    setFriends(savedFriends);
    setBlockedUsers(savedBlocked);
    
    // Simulate online users
    setOnlineUsers(['friend1@example.com', 'friend2@example.com']);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Simulate user search
    if (searchQuery) {
      const mockResults = [
        { email: `${searchQuery}@example.com`, name: searchQuery, lastSeen: 'Online' },
        { email: `test_${searchQuery}@example.com`, name: `Test ${searchQuery}`, lastSeen: '2 hours ago' }
      ];
      setSearchResults(mockResults);
    }
  };

  const addFriend = (user) => {
    if (!friends.find(f => f.email === user.email)) {
      const newFriends = [...friends, user];
      setFriends(newFriends);
      localStorage.setItem('chatapp_friends', JSON.stringify(newFriends));
    }
  };

  const removeFriend = (userEmail) => {
    const newFriends = friends.filter(f => f.email !== userEmail);
    setFriends(newFriends);
    localStorage.setItem('chatapp_friends', JSON.stringify(newFriends));
  };

  const blockUser = (userEmail) => {
    const newBlocked = [...blockedUsers, userEmail];
    setBlockedUsers(newBlocked);
    localStorage.setItem('chatapp_blocked', JSON.stringify(newBlocked));
    // Remove from friends if blocked
    removeFriend(userEmail);
  };

  const unblockUser = (userEmail) => {
    const newBlocked = blockedUsers.filter(email => email !== userEmail);
    setBlockedUsers(newBlocked);
    localStorage.setItem('chatapp_blocked', JSON.stringify(newBlocked));
  };

  const isOnline = (email) => onlineUsers.includes(email);

  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '20px', minHeight: '500px' }}>
      <h3 style={{ color: '#333', marginBottom: '20px' }}>Friends & Users</h3>
      
      {/* User Search */}
      <div style={{ marginBottom: '20px', backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h4 style={{ color: '#555', marginBottom: '10px' }}>Search Users</h4>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', flex: 1 }}
          />
          <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Search</button>
        </form>
        
        {searchResults.length > 0 && (
          <div style={{ marginTop: '15px' }}>
            <h5 style={{ color: '#555', marginBottom: '10px' }}>Search Results:</h5>
            {searchResults.map((user, index) => (
              <div key={index} style={{ border: '1px solid #e0e0e0', padding: '10px', margin: '5px 0', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                <span style={{ fontWeight: 'bold' }}>{user.name}</span>
                <span style={{ color: '#666' }}> ({user.email})</span>
                <span style={{ color: '#888' }}> - {user.lastSeen}</span>
                <button onClick={() => addFriend(user)} style={{ marginLeft: '10px', padding: '4px 8px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Add Friend</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Friends List */}
      <div style={{ marginBottom: '20px', backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: '150px' }}>
        <h4 style={{ color: '#555', marginBottom: '15px' }}>Friends ({friends.length})</h4>
        {friends.map((friend, index) => (
          <div key={index} style={{ border: '1px solid #e0e0e0', padding: '12px', margin: '8px 0', borderRadius: '6px', backgroundColor: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontWeight: 'bold', color: '#333' }}>{friend.name || friend.email}</span>
              <span style={{ color: isOnline(friend.email) ? '#28a745' : '#6c757d', marginLeft: '10px', fontSize: '14px' }}>
                {isOnline(friend.email) ? ' • Online' : ' • Last seen: 2 hours ago'}
              </span>
            </div>
            <div>
              <button onClick={() => removeFriend(friend.email)} style={{ marginRight: '5px', padding: '4px 8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Remove</button>
              <button onClick={() => blockUser(friend.email)} style={{ padding: '4px 8px', backgroundColor: '#ffc107', color: '#212529', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Block</button>
            </div>
          </div>
        ))}
        {friends.length === 0 && <p style={{ textAlign: 'center', color: '#999', marginTop: '50px', fontSize: '16px' }}>No friends added yet. Search for users above to add friends!</p>}
      </div>

      {/* Blocked Users */}
      <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: '100px' }}>
        <h4 style={{ color: '#555', marginBottom: '15px' }}>Blocked Users ({blockedUsers.length})</h4>
        {blockedUsers.map((email, index) => (
          <div key={index} style={{ border: '1px solid #e0e0e0', padding: '10px', margin: '5px 0', borderRadius: '4px', backgroundColor: '#f8f9fa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#333' }}>{email}</span>
            <button onClick={() => unblockUser(email)} style={{ padding: '4px 8px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Unblock</button>
          </div>
        ))}
        {blockedUsers.length === 0 && <p style={{ textAlign: 'center', color: '#999', marginTop: '30px' }}>No blocked users.</p>}
      </div>
    </div>
  );
}

export default Friends;
