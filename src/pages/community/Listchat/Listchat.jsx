import React, { useState, useEffect } from 'react';
import styles from './Listchat.module.scss';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const Listchat = ({ userName }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS('/stomp/chat'); // WebSocket 서버 URL
    const stompClient = new Client();
    stompClient.webSocketFactory = () => socket;
    stompClient.onConnect = () => {
      console.log('Connected to WebSocket');
      stompClient.subscribe('/sub/queue/test', message => {
        const newMessage = JSON.parse(message.body);
        setMessages(prevMessages => [...prevMessages, newMessage]);
      });
    };
    setStompClient(stompClient);

    // 더미 데이터 생성 (3명의 더미 사용자)
    const dummyMessages = [
      { sender: 'Dummy Member 1', content: '가나다라', timestamp: '2024-03-28T12:00:00' },
      { sender: 'Dummy Member 2', content: '가나다라마', timestamp: '2024-03-28T12:05:00' },
      { sender: 'Dummy Member 3', content: '가나다라마바사', timestamp: '2024-03-28T12:10:00' }
      // 더 많은 더미 데이터 추가 가능
    ];

    // 더미 데이터 설정
    setMessages(dummyMessages);

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;
    if (stompClient) {
      stompClient.publish({
        destination: '/pub/queue/test',
        body: JSON.stringify({
          sender: userName,
          content: inputMessage
        })
      });
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
          placeholder="메세지 입력 중..."
          className={styles.input}
        ></textarea>
        <button id="sendBtn" onClick={sendMessage} className={styles.sendButton}>Send</button>
      </div>
    </div>
  );
};

export default Listchat;