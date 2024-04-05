import React, { useState, useEffect } from 'react';
import styles from './Listchat.module.scss';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const Listchat = ({ userName }) => {
  const [messages, setMessages] = useState([
    { sender: 'Dummy Member 1', receiver: userName, content: '가나다라', timestamp: '2024-03-28T12:00:00' },
    { sender: 'Dummy Member 2', receiver: userName, content: '가나다라마', timestamp: '2024-03-28T12:05:00' },
    { sender: userName, receiver: 'Dummy Member 3', content: '가나다라마바사', timestamp: '2024-03-28T12:10:00' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/stomp/chat'); // 수정: 올바른 서버 경로로 변경
    const stompClient = new Client();
    stompClient.webSocketFactory = () => socket;
    stompClient.onConnect = () => {
      console.log('Connected to WebSocket');
      setStompClient(stompClient);
      stompClient.subscribe('/sub/queue/test', message => {
        const newMessage = JSON.parse(message.body);
        setMessages(prevMessages => [...prevMessages, newMessage]);
      });
    };
    stompClient.activate();
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [userName]);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: '/pub/queue/test',
        body: JSON.stringify({
          sender: userName,
          receiver: 'ReceiverUserName', // 실제 수신자 이름으로 변경
          content: inputMessage
        })
      });

      const newMessage = {
        sender: userName,
        receiver: 'ReceiverUserName', // 실제 수신자 이름으로 변경
        content: inputMessage,
        timestamp: new Date().toISOString()
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
    }
    setInputMessage('');
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatMessages}>
        {messages.map((message, index) => (
          <div key={index} className={`${styles.message} ${message.sender === userName ? styles.myMessage : styles.otherMessage}`}>
            <p>{message.content}</p>
            <div className={styles.messageInfo}>
              <span className={styles.messageSender}>{message.sender}</span>
              <span className={styles.messageTime}>{message.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.chatInput}>
        <textarea
          id="message-to-send"
          value={inputMessage}
          onChange={handleInputChange}
          placeholder="메세지 입력 중..."
          className={styles.input}
        ></textarea>
        <button id="sendBtn" onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
};

export default Listchat;