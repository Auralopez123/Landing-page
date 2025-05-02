import React, { useState } from 'react';
import '../css/ChatBotButton.css';
import chatLogo from '../assets/chatbot.svg';

const ChatBotButton = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]); // 🟢 Historial de chat
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setOpen(!open);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setChat(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch('http://173.212.224.226:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'granite3.3:2b',
          messages: [{ role: 'user', content: `Responde en español: ${input}` }],
          stream: false
        })
      });

      const data = await res.json();
      const botMessage = {
        role: 'assistant',
        content: data.message?.content || 'No se recibió respuesta'
      };

      setChat(prev => [...prev, botMessage]);
      setInput('');
    } catch (error) {
      console.error('Error:', error);
      setChat(prev => [...prev, { role: 'assistant', content: 'Error al conectarse al chatbot' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="chat-bot-button" onClick={toggleChat}>
        <img src={chatLogo} alt="ChatBot" />
      </button>

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            Chat con StockIA
            <span className="chat-close" onClick={toggleChat}>×</span>
          </div>
          <div className="chat-body">
            {chat.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.role}`}>
                <strong>{msg.role === 'user' ? 'Tú' : 'Bot'}:</strong> {msg.content}
              </div>
            ))}
            {loading && <div className="chat-message bot">Escribiendo...</div>}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              placeholder="Escribe tu pregunta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Enviar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBotButton;
