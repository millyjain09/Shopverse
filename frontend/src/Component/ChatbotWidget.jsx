import React, { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';
import { BsChatDotsFill, BsX, BsSendFill } from "react-icons/bs"; 
import { motion } from "framer-motion"; // ✅ IMPORT 1: Motion add kiya

const BACKEND_URL = 'http://localhost:8000/api/chatbot/message'; 

function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'ai', text: "Hello! I'm your Shopverse Assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null); 

    // Auto-scroll
    useEffect(() => {
        if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]); 

    const sendMessage = useCallback(async () => {
        const text = input.trim();
        if (!text || loading) return;
        const newUserMessage = { sender: 'user', text: text };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setLoading(true);
        try {
            const response = await axios.post(BACKEND_URL, { prompt: text, history: [...messages, newUserMessage] });
            setMessages(prev => [...prev, { sender: 'ai', text: response.data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { sender: 'ai', text: "Connection error. Please try again." }]);
        } finally { setLoading(false); }
    }, [input, loading, messages]);

    const handleKeyPress = (e) => { if (e.key === 'Enter') sendMessage(); };

    return (
        // ✅ UPDATE 1: Position Fixed (Mobile: bottom-24, Desktop: bottom-6)
        // ✅ UPDATE 2: 'drag' prop added for dragging
        <motion.div 
            drag
            dragMomentum={false} // Drag rukne par slide nahi karega
            className="fixed bottom-[90px] md:bottom-6 right-6 z-[100]"
        >
            
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 ${
                    isOpen ? 'bg-red-500 text-white rotate-90 text-3xl' : 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-2xl sm:text-3xl'
                }`}
            >
                {isOpen ? <BsX /> : <BsChatDotsFill />}
            </button>

            {/* Chat Window (Ye drag ke saath chalega) */}
            <div className={`absolute bottom-20 right-0 w-80 sm:w-[380px] bg-white border border-gray-200 shadow-2xl rounded-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${
                isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
            }`} style={{ height: '500px', maxHeight: '80vh' }}>
                
                {/* Header */}
                <div className="p-4 bg-gradient-to-r from-teal-700 to-emerald-600 text-white flex justify-between items-center shadow-md cursor-grab active:cursor-grabbing">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-full text-lg"><BsChatDotsFill /></div>
                        <div>
                            <h3 className="font-bold text-base">Shopverse AI</h3>
                            <p className="text-[10px] text-teal-100 flex items-center gap-1.5"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online</p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-2xl hover:text-gray-200"><BsX /></button>
                </div>
                
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-[#f8fafc] space-y-4 scrollbar-thin">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] px-4 py-2.5 text-sm shadow-sm ${msg.sender === 'user' ? 'bg-teal-600 text-white rounded-2xl rounded-tr-none' : 'bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-tl-none'}`}>{msg.text}</div>
                        </div>
                    ))}
                    {loading && <div className="text-xs text-gray-400 ml-4 animate-pulse">Typing...</div>}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 bg-white border-t border-gray-100">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-2 border border-gray-200 focus-within:border-teal-500 transition-all">
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} placeholder="Ask me anything..." disabled={loading} className="flex-1 bg-transparent outline-none text-sm text-gray-700 pl-2" />
                        <button onClick={sendMessage} disabled={loading || !input.trim()} className={`p-2.5 rounded-full transition-all ${input.trim() ? 'bg-teal-600 text-white shadow-md' : 'bg-gray-200 text-gray-400'}`}><BsSendFill className="text-xs" /></button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ChatWidget;