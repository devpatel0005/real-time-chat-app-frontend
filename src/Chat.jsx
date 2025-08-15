import React, { useState, useEffect } from 'react';

function Chat() {
  const [activeChat, setActiveChat] = useState(null);
  const [chatType, setChatType] = useState('1to1'); // '1to1' or 'group'
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');

  useEffect(() => {
    // Load friends and groups from localStorage
    const savedFriends = JSON.parse(localStorage.getItem('chatapp_friends') || '[]');
    const savedGroups = JSON.parse(localStorage.getItem('chatapp_groups') || '[]');
    setFriends(savedFriends);
    setGroups(savedGroups);
  }, []);

  useEffect(() => {
    // Load messages for active chat
    if (activeChat) {
      const chatKey = `chatapp_messages_${chatType}_${activeChat.id || activeChat.email}`;
      const savedMessages = JSON.parse(localStorage.getItem(chatKey) || '[]');
      setMessages(savedMessages);
    }
  }, [activeChat, chatType]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    const currentUser = JSON.parse(localStorage.getItem('chatapp_user'));
    const message = {
      id: Date.now(),
      sender: currentUser.email,
      text: newMessage,
      timestamp: new Date().toLocaleString()
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);

    // Save to localStorage
    const chatKey = `chatapp_messages_${chatType}_${activeChat.id || activeChat.email}`;
    localStorage.setItem(chatKey, JSON.stringify(updatedMessages));

    setNewMessage('');
  };

  const startChat = (friend) => {
    setActiveChat(friend);
    setChatType('1to1');
  };

  const createGroup = (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    const newGroup = {
      id: Date.now(),
      name: newGroupName,
      members: [JSON.parse(localStorage.getItem('chatapp_user')).email],
      createdAt: new Date().toLocaleString()
    };

    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    localStorage.setItem('chatapp_groups', JSON.stringify(updatedGroups));
    setNewGroupName('');
  };

  const joinGroup = (group) => {
    setActiveChat(group);
    setChatType('group');
  };

  return (
    <div style={{ display: 'flex', height: '500px', backgroundColor: '#f5f5f5' }}>
      {/* Sidebar */}
      <div style={{ width: '300px', borderRight: '1px solid #ddd', padding: '15px', backgroundColor: '#ffffff', boxShadow: '2px 0 4px rgba(0,0,0,0.1)' }}>
        <h4 style={{ color: '#333', marginBottom: '20px', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>Chats</h4>
        
        {/* 1-to-1 Chats */}
        <div style={{ marginBottom: '25px' }}>
          <h5 style={{ color: '#555', marginBottom: '10px', fontSize: '16px' }}>Friends</h5>
          <div style={{ backgroundColor: '#f8f9fa', borderRadius: '6px', padding: '10px', minHeight: '120px' }}>
            {friends.map((friend, index) => (
              <div 
                key={index} 
                style={{ 
                  padding: '10px 12px', 
                  cursor: 'pointer', 
                  backgroundColor: activeChat?.email === friend.email ? '#007bff' : '#ffffff',
                  color: activeChat?.email === friend.email ? 'white' : '#333',
                  margin: '5px 0',
                  borderRadius: '5px',
                  border: '1px solid #e0e0e0',
                  transition: 'all 0.2s',
                  fontWeight: activeChat?.email === friend.email ? 'bold' : 'normal'
                }}
                onClick={() => startChat(friend)}
                onMouseEnter={(e) => {
                  if (activeChat?.email !== friend.email) {
                    e.target.style.backgroundColor = '#e9ecef';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeChat?.email !== friend.email) {
                    e.target.style.backgroundColor = '#ffffff';
                  }
                }}
              >
                {friend.name || friend.email}
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  {activeChat?.email === friend.email ? 'Active chat' : 'Click to chat'}
                </div>
              </div>
            ))}
            {friends.length === 0 && (
              <p style={{ textAlign: 'center', color: '#6c757d', marginTop: '40px', fontStyle: 'italic' }}>
                No friends to chat with.<br/>
                <small>Go to "Manage Friends" to add friends first.</small>
              </p>
            )}
          </div>
        </div>

        {/* Group Chats */}
        <div>
          <h5 style={{ color: '#555', marginBottom: '10px', fontSize: '16px' }}>Groups</h5>
          <form onSubmit={createGroup} style={{ marginBottom: '15px', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Group name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              style={{ 
                flex: 1, 
                padding: '8px 10px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
            <button 
              type="submit" 
              style={{ 
                padding: '8px 12px', 
                backgroundColor: '#28a745', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              Create
            </button>
          </form>
          
          <div style={{ backgroundColor: '#f8f9fa', borderRadius: '6px', padding: '10px', minHeight: '100px' }}>
            {groups.map((group, index) => (
              <div 
                key={index}
                style={{ 
                  padding: '10px 12px', 
                  cursor: 'pointer',
                  backgroundColor: activeChat?.id === group.id ? '#28a745' : '#ffffff',
                  color: activeChat?.id === group.id ? 'white' : '#333',
                  margin: '5px 0',
                  borderRadius: '5px',
                  border: '1px solid #e0e0e0',
                  fontWeight: activeChat?.id === group.id ? 'bold' : 'normal'
                }}
                onClick={() => joinGroup(group)}
                onMouseEnter={(e) => {
                  if (activeChat?.id !== group.id) {
                    e.target.style.backgroundColor = '#e9ecef';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeChat?.id !== group.id) {
                    e.target.style.backgroundColor = '#ffffff';
                  }
                }}
              >
                {group.name}
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  Group chat • {group.members?.length || 1} members
                </div>
              </div>
            ))}
            {groups.length === 0 && (
              <p style={{ textAlign: 'center', color: '#6c757d', marginTop: '30px', fontStyle: 'italic' }}>
                No groups created yet.<br/>
                <small>Create a group to start group chatting.</small>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, padding: '15px', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5' }}>
        {activeChat ? (
          <>
            <div style={{ 
              backgroundColor: '#ffffff', 
              padding: '15px', 
              borderRadius: '8px 8px 0 0', 
              borderBottom: '1px solid #e0e0e0',
              marginBottom: '0'
            }}>
              <h4 style={{ margin: 0, color: '#333' }}>
                {chatType === '1to1' 
                  ? `💬 Chat with ${activeChat.name || activeChat.email}` 
                  : `👥 Group: ${activeChat.name}`
                }
              </h4>
            </div>
            
            {/* Messages */}
            <div style={{ 
              flex: 1, 
              backgroundColor: '#ffffff',
              padding: '15px', 
              overflowY: 'auto',
              borderLeft: '1px solid #e0e0e0',
              borderRight: '1px solid #e0e0e0'
            }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 'bold', color: '#007bff', marginBottom: '5px' }}>{msg.sender}:</div>
                  <div style={{ color: '#333', marginBottom: '5px' }}>{msg.text}</div>
                  <div style={{ fontSize: '11px', color: '#6c757d' }}>{msg.timestamp}</div>
                </div>
              ))}
              {messages.length === 0 && (
                <div style={{ textAlign: 'center', marginTop: '50px', color: '#6c757d' }}>
                  <h5>💬 No messages yet</h5>
                  <p>Start the conversation by sending a message below!</p>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div style={{ 
              backgroundColor: '#ffffff', 
              padding: '15px', 
              borderRadius: '0 0 8px 8px',
              border: '1px solid #e0e0e0'
            }}>
              <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  style={{ 
                    flex: 1, 
                    padding: '10px 15px', 
                    border: '1px solid #ddd', 
                    borderRadius: '25px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <button 
                  type="submit" 
                  style={{ 
                    padding: '10px 20px', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '25px', 
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    minWidth: '80px'
                  }}
                >
                  Send
                </button>
              </form>
            </div>
          </>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            marginTop: '100px', 
            backgroundColor: '#ffffff', 
            padding: '40px', 
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#333', marginBottom: '15px' }}>💬 Welcome to Chat</h3>
            <p style={{ color: '#6c757d', fontSize: '16px' }}>Select a friend or group to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
