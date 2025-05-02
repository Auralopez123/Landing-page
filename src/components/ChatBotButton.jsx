import React, { useState } from 'react';
import '../css/ChatBotButton.css';
import chatLogo from '../assets/chatbot.svg';

const ChatBotButton = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]); // Historial de chat
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setOpen(!open);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newChat = [...chat, userMessage];
    const botMessage = { role: 'assistant', content: '' };
    const messageIndex = newChat.length;

    // Añadir mensaje del usuario y espacio para el bot
    setChat([...newChat, botMessage]);
    setLoading(true);

    try {
      const res = await fetch('http://173.212.224.226:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'granite3.3:2b',
          messages: [{ role: 'user', content: `Responde en español: ${input}` }],
          stream: true
        })
      });

      if (!res.body) throw new Error('No se pudo iniciar el stream');

      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let partial = '';
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        partial += decoder.decode(value, { stream: true });
        const lines = partial.split('\n');
        partial = lines.pop(); // Guarda la línea incompleta para la próxima vuelta

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const json = JSON.parse(line);
            const text = json.message?.content || '';
            accumulated += text;

            setChat(prev => {
              const updated = [...prev];
              updated[messageIndex] = {
                role: 'assistant',
                content: accumulated
              };
              return updated;
            });
          } catch (err) {
            console.warn('No se pudo parsear línea:', line);
          }
        }
      }

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
            {loading && <div className="chat-message assistant">Escribiendo...</div>}
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
