import { useState, useEffect } from 'react'
import '../styles/ChatWindow.css'

function ChatWindow({ conversation, currentUser, onSendMessage }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(conversation.messages || [])

  useEffect(() => {
    setMessages(conversation.messages || [])
  }, [conversation])

  const handleSend = () => {
    if (!message.trim()) return

    onSendMessage(message)
    setMessages([...messages, {
      id: Date.now().toString(),
      senderId: currentUser.id,
      recipientId: conversation.id,
      text: message,
      createdAt: new Date()
    }])
    setMessage('')
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <img src={conversation.otherUser.profilePicture} alt={conversation.otherUser.username} />
        <h2>{conversation.otherUser.username}</h2>
      </div>

      <div className="messages-list">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.senderId === currentUser.id ? 'sent' : 'received'}`}>
            <p>{msg.text}</p>
            <div className="time">{new Date(msg.createdAt).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>

      <form className="message-input-form" onSubmit={(e) => { e.preventDefault(); handleSend() }}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" disabled={!message.trim()}>
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatWindow
