import { useEffect, useState, useRef } from "react";
import { database, ref, push, onValue } from "../../firebase";

// Mock users (replace with real auth later)
const mockUsers = [
  { id: "1", name: "Alice", avatar: "A", online: true },
  { id: "2", name: "Bob", avatar: "B", online: true },
  { id: "3", name: "Charlie", avatar: "C", online: false },
];

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Load messages in realtime
  useEffect(() => {
    const messagesRef = ref(database, "messages");
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.entries(data).map(([id, msg]) => ({
          id,
          ...msg,
        }));
        setMessages(arr);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const messagesRef = ref(database, "messages");
    push(messagesRef, {
      userId: "1", // replace with auth.currentUser.uid
      text: newMessage,
      timestamp: Date.now(),
    });

    setNewMessage("");
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  // Get user by ID
  const getUserById = (id) => mockUsers.find((u) => u.id === id) || { name: "Unknown", avatar: "?" };

  return (
    <div className="fixed bottom-4 right-4 w-full max-w-md mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700 transform translate-y-20 opacity-0 animate-slide-up">
  {/* Header */}
  <div className="bg-indigo-700 px-4 py-3 flex justify-between items-center">
    <div className="flex items-center">
      <h3 className="text-white font-bold text-lg">Game Chat</h3>
      <span className="ml-2 bg-green-500 rounded-full w-2 h-2 animate-pulse"></span>
    </div>
    <button className="text-white hover:text-gray-200 transition-transform transform hover:scale-110">
      <i className="fas fa-times"></i>
    </button>
  </div>

  {/* Online Users */}
  <div className="px-4 py-2 bg-gray-700 flex overflow-x-auto space-x-3">
    {mockUsers.filter((user) => user.online).map((user) => (
      <div key={user.id} className="flex flex-col items-center transition-transform transform hover:scale-110">
        <div className="relative">
          <div className="w-10 h-10 flex items-center justify-center bg-gray-600 rounded-full text-xl transition-all duration-300 hover:ring-2 hover:ring-indigo-500">
            {user.avatar}
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-700 animate-pulse"></div>
        </div>
        <span className="text-xs text-gray-300 mt-1">{user.name}</span>
      </div>
    ))}
  </div>

  {/* Messages */}
  <div className="h-80 overflow-y-auto p-4 bg-gray-900 space-y-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
    {messages.map((message) => {
      const user = getUserById(message.userId);
      const isCurrentUser = message.userId === "1";
      return (
        <div
          key={message.id}
          className={`flex mb-4 transition-all duration-300 ${
            isCurrentUser ? "justify-end" : "justify-start"
          } animate-fade-in`}
        >
          {!isCurrentUser && (
            <div className="w-9 h-9 flex items-center justify-center bg-gray-600 rounded-full text-lg mr-2">
              {user.avatar}
            </div>
          )}
          <div
            className={`max-w-xs rounded-lg px-4 py-2 transition-colors duration-300 ${
              isCurrentUser
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
          >
            {!isCurrentUser && (
              <div className="font-bold text-xs text-indigo-300">{user.name}</div>
            )}
            <p className="text-sm">{message.text}</p>
            <div
              className={`text-xs mt-1 ${
                isCurrentUser ? "text-indigo-300" : "text-gray-400"
              }`}
            >
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      );
    })}
    <div ref={messagesEndRef} />
  </div>

  {/* Input */}
  <div className="px-4 py-3 bg-gray-800 border-t border-gray-700">
    <div className="flex items-center space-x-2">
      <input
        type="text"
        className="flex-1 bg-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        className="bg-indigo-600 text-white rounded-lg p-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform transform hover:scale-110"
        onClick={handleSendMessage}
      >
        <i className="fas fa-paper-plane"></i>
      </button>
    </div>
  </div>

  {/* Tailwind Animations */}
  <style jsx>{`
    @keyframes slide-up {
      from { transform: translateY(80px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .animate-slide-up {
      animation: slide-up 0.5s ease-out forwards;
    }
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fade-in 0.3s ease-out forwards;
    }
  `}</style>
</div>

  );
};

export default LiveChat;
