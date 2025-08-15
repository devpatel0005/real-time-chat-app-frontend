import React, { useState, useEffect, useRef } from 'react';

function Chat() {
  const [activeChat, setActiveChat] = useState(null);
  const [chatType, setChatType] = useState('1to1');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  
  // Advanced features
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [showReactions, setShowReactions] = useState({});
  const [showDeleteMenu, setShowDeleteMenu] = useState({});
  
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem('chatapp_user'));

  // Load data on component mount
  useEffect(() => {
    setFriends(JSON.parse(localStorage.getItem('chatapp_friends') || '[]'));
    setGroups(JSON.parse(localStorage.getItem('chatapp_groups') || '[]'));
  }, []);

  // Load messages when chat changes
  useEffect(() => {
    if (activeChat) {
      const chatKey = `chatapp_messages_${chatType}_${activeChat.id || activeChat.email}`;
      setMessages(JSON.parse(localStorage.getItem(chatKey) || '[]'));
    }
  }, [activeChat, chatType]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Typing indicator timeout
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => setIsTyping(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  // Simulate other user typing
  useEffect(() => {
    if (newMessage.length > 0) {
      setIsTyping(true);
      if (Math.random() > 0.7) {
        setOtherUserTyping(true);
        setTimeout(() => setOtherUserTyping(false), 2000);
      }
    }
  }, [newMessage]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    const message = {
      id: Date.now(),
      sender: currentUser.email,
      text: newMessage,
      timestamp: new Date().toLocaleString(),
      status: 'sent', // sent, delivered, seen
      reactions: {},
      type: 'text', // text, image, file, voice
      deletedForMe: false,
      deletedForEveryone: false
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);

    const chatKey = `chatapp_messages_${chatType}_${activeChat.id || activeChat.email}`;
    localStorage.setItem(chatKey, JSON.stringify(updatedMessages));

    // Simulate message status updates
    setTimeout(() => {
      const deliveredMessages = updatedMessages.map(msg => 
        msg.id === message.id ? { ...msg, status: 'delivered' } : msg
      );
      setMessages(deliveredMessages);
      localStorage.setItem(chatKey, JSON.stringify(deliveredMessages));
    }, 1000);

    setTimeout(() => {
      const seenMessages = updatedMessages.map(msg => 
        msg.id === message.id ? { ...msg, status: 'seen' } : msg
      );
      setMessages(seenMessages);
      localStorage.setItem(chatKey, JSON.stringify(seenMessages));
    }, 3000);

    setNewMessage('');
    setIsTyping(false);
  };

  const createGroup = (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    const newGroup = {
      id: Date.now(),
      name: newGroupName,
      members: [currentUser.email],
      createdAt: new Date().toLocaleString()
    };

    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    localStorage.setItem('chatapp_groups', JSON.stringify(updatedGroups));
    setNewGroupName('');
  };

  // File upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !activeChat) return;

    const message = {
      id: Date.now(),
      sender: currentUser.email,
      text: `📎 ${file.name}`,
      timestamp: new Date().toLocaleString(),
      status: 'sent',
      reactions: {},
      type: file.type.startsWith('image/') ? 'image' : 'file',
      fileName: file.name,
      fileSize: (file.size / 1024).toFixed(1) + ' KB',
      deletedForMe: false,
      deletedForEveryone: false
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);

    const chatKey = `chatapp_messages_${chatType}_${activeChat.id || activeChat.email}`;
    localStorage.setItem(chatKey, JSON.stringify(updatedMessages));

    e.target.value = ''; // Reset file input
  };

  // Add reaction to message
  const addReaction = (messageId, emoji) => {
    const updatedMessages = messages.map(msg => {
      if (msg.id === messageId) {
        const reactions = { ...msg.reactions };
        if (reactions[emoji]) {
          if (reactions[emoji].includes(currentUser.email)) {
            reactions[emoji] = reactions[emoji].filter(email => email !== currentUser.email);
            if (reactions[emoji].length === 0) delete reactions[emoji];
          } else {
            reactions[emoji].push(currentUser.email);
          }
        } else {
          reactions[emoji] = [currentUser.email];
        }
        return { ...msg, reactions };
      }
      return msg;
    });

    setMessages(updatedMessages);
    const chatKey = `chatapp_messages_${chatType}_${activeChat.id || activeChat.email}`;
    localStorage.setItem(chatKey, JSON.stringify(updatedMessages));
    setShowReactions({});
  };

  // Delete message
  const deleteMessage = (messageId, deleteType) => {
    const updatedMessages = messages.map(msg => {
      if (msg.id === messageId) {
        if (deleteType === 'me') {
          return { ...msg, deletedForMe: true };
        } else if (deleteType === 'everyone') {
          return { ...msg, deletedForEveryone: true, text: '🚫 This message was deleted' };
        }
      }
      return msg;
    });

    setMessages(updatedMessages);
    const chatKey = `chatapp_messages_${chatType}_${activeChat.id || activeChat.email}`;
    localStorage.setItem(chatKey, JSON.stringify(updatedMessages));
    setShowDeleteMenu({});
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent': return '✓';
      case 'delivered': return '✓✓';
      case 'seen': return '✓✓';
      default: return '';
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return '#6c757d';
      case 'delivered': return '#6c757d';
      case 'seen': return '#007bff';
      default: return '#6c757d';
    }
  };

  const ChatItem = ({ item, isActive, onClick, children }) => (
    <div 
      onClick={onClick}
      style={{ 
        padding: '10px', 
        cursor: 'pointer', 
        backgroundColor: isActive ? '#007bff' : '#fff',
        color: isActive ? 'white' : '#333',
        margin: '5px 0',
        borderRadius: '5px',
        border: '1px solid #ddd'
      }}
    >
      {children}
    </div>
  );

  return (
    <div style={{ 
      display: 'flex', 
      height: '500px', 
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      {/* Sidebar */}
      <div style={{ 
        width: '300px', 
        padding: '15px',
        backgroundColor: '#fff',
        borderRight: '1px solid #ddd'
      }}>
        <h4 style={{ marginBottom: '20px', color: '#333' }}> Chats</h4>
        
        {/* Friends */}
        <div style={{ marginBottom: '20px' }}>
          <h5 style={{ marginBottom: '10px' }}>Friends</h5>
          <div style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '5px' }}>
            {friends.map((friend, index) => (
              <ChatItem 
                key={index}
                isActive={activeChat?.email === friend.email}
                onClick={() => {
                  setActiveChat(friend);
                  setChatType('1to1');
                }}
              >
                {friend.name || friend.email}
              </ChatItem>
            ))}
            {friends.length === 0 && (
              <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
                No friends added yet
              </p>
            )}
          </div>
        </div>

        {/* Groups */}
        <div>
          <h5 style={{ marginBottom: '10px' }}>Groups</h5>
          <form onSubmit={createGroup} style={{ marginBottom: '10px', display: 'flex', gap: '5px' }}>
            <input
              type="text"
              placeholder="Group name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              style={{ flex: 1, padding: '5px', border: '1px solid #ddd', borderRadius: '3px' }}
            />
            <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px' }}>
              Create
            </button>
          </form>
          
          <div style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '5px' }}>
            {groups.map((group, index) => (
              <ChatItem 
                key={index}
                isActive={activeChat?.id === group.id}
                onClick={() => {
                  setActiveChat(group);
                  setChatType('group');
                }}
              >
                {group.name}
              </ChatItem>
            ))}
            {groups.length === 0 && (
              <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
                No groups created
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ 
        flex: 1, 
        padding: '20px', 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: '#fff'
      }}>
        {activeChat ? (
          <>
            <h4 style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #ddd' }}>
              {chatType === '1to1' ? `Chat with ${activeChat.name || activeChat.email}` : `Group: ${activeChat.name}`}
            </h4>
            
            {/* Messages */}
            <div style={{ 
              flex: 1, 
              border: '1px solid #ddd', 
              padding: '15px', 
              overflowY: 'auto',
              marginBottom: '15px',
              backgroundColor: '#f9f9f9',
              borderRadius: '5px'
            }}>
              {messages.filter(msg => !msg.deletedForMe).map((msg) => (
                <div key={msg.id} style={{ 
                  marginBottom: '10px',
                  padding: '8px 12px',
                  backgroundColor: msg.sender === currentUser.email ? '#007bff' : '#fff',
                  color: msg.sender === currentUser.email ? 'white' : '#333',
                  borderRadius: '8px',
                  maxWidth: '70%',
                  marginLeft: msg.sender === currentUser.email ? 'auto' : '0',
                  position: 'relative'
                }}>
                  {/* Message Content */}
                  <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{msg.sender}</div>
                  <div style={{ marginBottom: '5px' }}>
                    {msg.deletedForEveryone ? (
                      <em style={{ color: '#6c757d' }}>🚫 This message was deleted</em>
                    ) : msg.type === 'image' ? (
                      <div>
                        🖼️ <strong>Image:</strong> {msg.fileName}
                        <div style={{ fontSize: '10px', opacity: 0.7 }}>Size: {msg.fileSize}</div>
                      </div>
                    ) : msg.type === 'file' ? (
                      <div>
                        📄 <strong>File:</strong> {msg.fileName}
                        <div style={{ fontSize: '10px', opacity: 0.7 }}>Size: {msg.fileSize}</div>
                      </div>
                    ) : msg.type === 'voice' ? (
                      <div>
                        🎤 <strong>Voice Message</strong>
                        <div style={{ fontSize: '10px', opacity: 0.7 }}>Duration: 00:15</div>
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>

                  {/* Message Reactions */}
                  {Object.keys(msg.reactions || {}).length > 0 && (
                    <div style={{ marginBottom: '5px' }}>
                      {Object.entries(msg.reactions).map(([emoji, users]) => (
                        <span 
                          key={emoji}
                          style={{ 
                            display: 'inline-block',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            padding: '2px 5px',
                            borderRadius: '10px',
                            margin: '2px',
                            fontSize: '10px',
                            cursor: 'pointer'
                          }}
                          onClick={() => addReaction(msg.id, emoji)}
                        >
                          {emoji} {users.length}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Message Footer */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', opacity: 0.7 }}>
                    <span>{msg.timestamp}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      {/* Reaction Button */}
                      <button 
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px' }}
                        onClick={() => setShowReactions({...showReactions, [msg.id]: !showReactions[msg.id]})}
                      >
                        😊
                      </button>
                      
                      {/* Delete Button (only for own messages) */}
                      {msg.sender === currentUser.email && (
                        <button 
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px' }}
                          onClick={() => setShowDeleteMenu({...showDeleteMenu, [msg.id]: !showDeleteMenu[msg.id]})}
                        >
                          🗑️
                        </button>
                      )}

                      {/* Status Indicator (only for sent messages) */}
                      {msg.sender === currentUser.email && (
                        <span style={{ fontSize: '12px', color: getStatusColor(msg.status) }}>
                          {getStatusIcon(msg.status)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Reaction Picker */}
                  {showReactions[msg.id] && (
                    <div style={{
                      position: 'absolute',
                      bottom: '-35px',
                      right: '10px',
                      backgroundColor: 'white',
                      border: '1px solid #ddd',
                      borderRadius: '15px',
                      padding: '5px 8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      zIndex: 1000
                    }}>
                      {['👍', '❤️', '😂', '😮', '😢', '😡'].map(emoji => (
                        <span 
                          key={emoji}
                          style={{ cursor: 'pointer', margin: '0 3px', fontSize: '16px' }}
                          onClick={() => addReaction(msg.id, emoji)}
                        >
                          {emoji}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Delete Menu */}
                  {showDeleteMenu[msg.id] && (
                    <div style={{
                      position: 'absolute',
                      bottom: '-55px',
                      right: '10px',
                      backgroundColor: 'white',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      zIndex: 1000
                    }}>
                      <button 
                        style={{ display: 'block', padding: '8px 12px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px' }}
                        onClick={() => deleteMessage(msg.id, 'me')}
                      >
                        Delete for me
                      </button>
                      <button 
                        style={{ display: 'block', padding: '8px 12px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px', borderTop: '1px solid #eee' }}
                        onClick={() => deleteMessage(msg.id, 'everyone')}
                      >
                        Delete for everyone
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {otherUserTyping && (
                <div style={{ 
                  padding: '8px 12px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '8px',
                  marginBottom: '10px',
                  maxWidth: '70%',
                  fontStyle: 'italic',
                  color: '#666'
                }}>
                  {activeChat.name || activeChat.email} is typing
                  <span style={{ animation: 'blink 1.5s infinite' }}>...</span>
                </div>
              )}

              {messages.filter(msg => !msg.deletedForMe).length === 0 && (
                <div style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
                  <p>No messages yet. Start the conversation!</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            {isTyping && (
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                You are typing...
              </div>
            )}

            {/* Media Upload Options */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                accept="image/*,video/*,.pdf,.doc,.docx,.txt"
              />
              
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                📎 File
              </button>

              <button
                type="button"
                onClick={() => {
                  fileInputRef.current.accept = "image/*";
                  fileInputRef.current?.click();
                }}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#17a2b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                🖼️ Photo
              </button>

              <button
                type="button"
                onClick={() => {
                  // Simulate voice message
                  const message = {
                    id: Date.now(),
                    sender: currentUser.email,
                    text: '🎤 Voice message',
                    timestamp: new Date().toLocaleString(),
                    status: 'sent',
                    reactions: {},
                    type: 'voice',
                    deletedForMe: false,
                    deletedForEveryone: false
                  };
                  
                  const updatedMessages = [...messages, message];
                  setMessages(updatedMessages);
                  const chatKey = `chatapp_messages_${chatType}_${activeChat.id || activeChat.email}`;
                  localStorage.setItem(chatKey, JSON.stringify(updatedMessages));
                }}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#6f42c1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                🎤 Voice
              </button>
            </div>

            <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  if (!isTyping && e.target.value.length > 0) {
                    setIsTyping(true);
                  }
                }}
                style={{ 
                  flex: 1,
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '20px'
                }}
              />
              <button 
                type="submit"
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer'
                }}
              >
                Send
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '100px', color: '#666' }}>
            <h4>Welcome to Chat</h4>
            <p>Select a friend or create a group to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
