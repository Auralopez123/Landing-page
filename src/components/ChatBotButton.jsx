import React, { useState } from 'react';
import '../css/ChatBotButton.css';
import chatLogo from '../assets/chatbot.svg';

const ChatBotButton = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setOpen(!open);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('http://173.212.224.226:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'granite3.3:2b',
          messages: [{ role: 'user', content: `Responde en español: ${input}` }],
          stream: false // Desactivar streaming
        })
      });

      const data = await res.json();
      setResponse(data.message?.content || 'No se recibió respuesta');
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error al conectarse al chatbot');
    } finally {
      setLoading(false);
    }
  }
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
            {loading ? 'Cargando...' : response}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              placeholder="Escribe tu pregunta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>Enviar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBotButton;

