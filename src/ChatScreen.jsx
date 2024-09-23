import React, { useState } from 'react';
import './ChatScreen.css'; // Import your CSS for styles

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    const newMessage = {
      userMessage: inputText,
      createdAt: new Date(),
      sender: 'user',
      id: `user-${Date.now()}`,
    };

    setLoading(true);

    try {
      const response = await fetch('https://ramisgpt-1.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });

      const receivedMessage = await response.json();
      console.log('Received Message:', receivedMessage);

      const responseMessage = {
        userMessage: receivedMessage.response,
        createdAt: new Date(),
        sender: 'bot',
        id: `bot-${Date.now()}`,
      };

      setMessages((prevMessages) => [
        responseMessage,
        newMessage,
        ...prevMessages,
      ]);

      setInputText('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
      event.preventDefault(); // Prevent default behavior of enter key
    }
  };

  const renderMessage = (message) => (
    <div key={message.id} className={`message-container ${message.sender}`}>
      <p className="message-text">{message.userMessage}</p>
      <span className="timestamp">{message.createdAt?.toLocaleTimeString()}</span>
    </div>
  );

  return (
    <div className="container">
      <div className="header">
        <h1>Ramis GPT</h1>
      </div>
      <div className="chat-container">
        <div className="message-list">
          {messages.map(renderMessage).reverse()}
        </div>

        <div className="input-container">
          <textarea
            className="input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={handleKeyPress}
            rows={2}
          />
          <button className="send-button" onClick={sendMessage}>
            Send
          </button>
        </div>

        {loading && <div className="loading-indicator">Loading...</div>}
      </div>
    </div>
  );
}
