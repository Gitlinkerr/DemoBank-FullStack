import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCommentsAction, postCommentAction } from '../actions/Actions';

const Comment = () => {
    const currentUser = useSelector(state => state.user);
    const messages = useSelector(state => state.message.data); 
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchCommentsAction(currentUser.id));
    }, [currentUser.id, dispatch]);

    const [newMessage, setNewMessage] = useState('');

    const handleMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(postCommentAction(currentUser.id, newMessage));
        dispatch(fetchCommentsAction(currentUser.id));
        setNewMessage(''); 
    };

    return (
        <div className="p-8 bg-gray-200 rounded-md w-full mx-auto">
            <h2 className="text-2xl font-bold mb-4">Comment section</h2>
    
            <form onSubmit={handleSubmit} className="space-y-4 mb-4">
                <textarea 
                    value={newMessage} 
                    onChange={handleMessageChange} 
                    className="w-full px-3 py-2 border rounded-md" 
                    placeholder="Write a new message..."
                ></textarea>
                <button type="submit" className="w-full px-3 py-2 text-white bg-blue-500 rounded-md">Submit Message</button>
            </form>
    
            <ul >
    {messages.map((message, index) => (
        <li key={index} className="border p-2 mb-2">{message}</li>
    ))}
</ul>
        </div>
    );
};

export default Comment;
