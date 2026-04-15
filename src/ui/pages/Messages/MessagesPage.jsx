import { useState, useEffect, useRef } from 'react';
import API from '../../../infra/api/axios';
import { GET_CONVERSATIONS, GET_MESSAGES, SEND_MESSAGE } from '../../../infra/constants/apiEndpoints';
import { useUser } from '../../../service/auth/useUser';
import './MessagesPage.scss';

const MessagesPage = () => {
    const { currentUser } = useUser();
    const [conversations, setConversations] = useState([]);
    const [selectedConv, setSelectedConv] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);
    const pollRef = useRef(null);

    useEffect(() => {
        fetchConversations();
    }, []);

    useEffect(() => {
        if (!selectedConv) return;
        fetchMessages(selectedConv.id);
        pollRef.current = setInterval(() => fetchMessages(selectedConv.id), 4000);
        return () => clearInterval(pollRef.current);
    }, [selectedConv]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const fetchConversations = () => {
        API.get(GET_CONVERSATIONS)
            .then(r => {
                const data = r.data;
                const list = Array.isArray(data) ? data
                    : Array.isArray(data?.content) ? data.content
                    : Array.isArray(data?.conversations) ? data.conversations
                    : [];
                setConversations(list);
            })
            .catch(() => setConversations([]))
            .finally(() => setLoading(false));
    };

    const fetchMessages = (convId) => {
        API.get(GET_MESSAGES(convId))
            .then(r => {
                const data = r.data;
                const list = Array.isArray(data) ? data
                    : Array.isArray(data?.content) ? data.content
                    : Array.isArray(data?.messages) ? data.messages
                    : [];
                setMessages(list);
            })
            .catch(() => {});
    };

    const handleSend = () => {
        if (!input.trim() || !selectedConv) return;
        API.post(SEND_MESSAGE(selectedConv.id), { content: input.trim() })
            .then(() => {
                setInput('');
                fetchMessages(selectedConv.id);
            })
            .catch(() => {});
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const getOtherName = (conv) => {
        if (!currentUser) return '';
        const isStaff = currentUser.role === 'ROLE_STAFF' || conv.staffEmail === currentUser.sub;
        return isStaff ? conv.studentName : conv.staffName;
    };

    const getInitials = (name) => name?.split(' ').map(n => n[0]).slice(0, 2).join('') ?? '?';

    return (
        <div className="messages-page">
            <div className="messages-page__sidebar">
                <h2 className="messages-page__sidebar-title">Messages</h2>
                {loading && <p className="messages-page__empty">Loading...</p>}
                {!loading && conversations.length === 0 && (
                    <p className="messages-page__empty">No conversations yet.</p>
                )}
                {conversations.map(conv => (
                    <div
                        key={conv.id}
                        className={`messages-page__conv-item ${selectedConv?.id === conv.id ? 'messages-page__conv-item--active' : ''}`}
                        onClick={() => setSelectedConv(conv)}
                    >
                        <div className="messages-page__conv-avatar">{getInitials(getOtherName(conv))}</div>
                        <div className="messages-page__conv-info">
                            <p className="messages-page__conv-name">{getOtherName(conv)}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="messages-page__chat">
                {!selectedConv ? (
                    <div className="messages-page__placeholder">
                        <p>Select a conversation to start chatting</p>
                    </div>
                ) : (
                    <>
                        <div className="messages-page__chat-header">
                            <div className="messages-page__conv-avatar">{getInitials(getOtherName(selectedConv))}</div>
                            <p>{getOtherName(selectedConv)}</p>
                        </div>

                        <div className="messages-page__chat-body">
                            {messages.map(msg => {
                                const isMine = msg.senderEmail === currentUser?.sub;
                                return (
                                    <div
                                        key={msg.id}
                                        className={`messages-page__bubble ${isMine ? 'messages-page__bubble--mine' : 'messages-page__bubble--theirs'}`}
                                    >
                                        <p>{msg.content}</p>
                                        <span>{new Date(msg.sentAt.endsWith('Z') ? msg.sentAt : msg.sentAt + 'Z').toLocaleTimeString('en-IE', { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="messages-page__chat-input">
                            <textarea
                                rows={1}
                                placeholder="Type a message..."
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button onClick={handleSend} disabled={!input.trim()}>Send</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MessagesPage;
