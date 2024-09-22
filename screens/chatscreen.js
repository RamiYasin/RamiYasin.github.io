import React, { useState } from 'react';
import {  Platform, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';


export default function Chatscreen() {
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
    if (Platform.OS === 'web' && event.key === 'Enter') {
      sendMessage();
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
      <Text style={styles.messageText}>{item.userMessage}</Text>
      <Text style={styles.timestamp}>{item.createdAt?.toLocaleTimeString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        inverted
        contentContainerStyle={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          placeholder="Type a message..."
          onKeyPress={handleKeyPress}
          multiline={true}  // Enable multiline to allow the text to wrap
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <ActivityIndicator size="small" color="#0084ff" style={styles.loadingIndicator} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    ...(Platform.OS === 'web' && {
      width: '50%',  // Web-specific width
      height: '100vh',  // Web-specific height
      marginLeft: '25%',  // Centering the container for web
    }),
  },
  messageList: {
    paddingVertical: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#0084ff',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#228B22',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 10,
    color: '#fff',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#e5e5ea',
    ...(Platform.OS === 'web' && {
      width: '100%',  // Web-specific input width
    }),
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e5ea',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#0084ff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
  },
  loadingIndicator: {
    position: 'absolute',
    bottom: 80,
    right: 20,
  },
});
