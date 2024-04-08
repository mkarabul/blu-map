"use client"
import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

const NotificationsPage = ({ themeClasses }) => {
    const { user } = useUser();
    const [notifications, setNotifications] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [newNotification, setNewNotification] = useState({ header: '', description: '' });

    useEffect(() => {
        if (user?.sub) {
            fetchNotifications();
        }
    }, [user?.sub]);

    const fetchNotifications = async () => {
        try {
            const response = await fetch(`/api/admin/notifications/get/${user?.sub}`);
            const data = await response.json();
            if (response.ok) {
                setNotifications(data);
            } else {
                throw new Error(data.error || 'Failed to fetch notifications');
            }
        } catch (error) {
            console.error("Fetching notifications error:", error);
        }
    };

    const addNotification = async () => {
        if (!newNotification.header || !newNotification.description) {
            alert("Please fill in both the header and description.");
            return; 
        }
    
        try {
            const response = await fetch('/api/admin/notifications/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    header: newNotification.header,
                    description: newNotification.description,
                    userId: user?.sub
                }),
            });
            const data = await response.json();
            if (response.ok) {
                fetchNotifications(); 
                toggleInputVisibility(); 
            } else {
                throw new Error(data.error || 'Failed to post notification');
            }
        } catch (error) {
            console.error("Posting notification error:", error);
        }
    };
    
    
    const deleteNotification = async (notificationId) => {
        alert(notificationId);
        try {
            const response = await fetch(`/api/admin/notifications/delete/${notificationId}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                const updatedNotifications = notifications.filter(notification => notification.id !== notificationId);
                setNotifications(updatedNotifications);
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete notification');
            }
        } catch (error) {
            console.error("Deleting notification error:", error);
        }
    };
    

    const toggleInputVisibility = () => {
        setShowInput(!showInput);
        if (showInput) {
            setNewNotification({ header: '', description: '' });
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    return (
        <div className={`container mx-auto p-4 ${themeClasses}`}>
            <h1 className="text-2xl font-bold mb-4">Notifications</h1>
            <button
                onClick={toggleInputVisibility}
                className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                {showInput ? 'Cancel' : 'Add Notification'}
            </button>
            {showInput && (
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Header"
                        className="shadow appearance-none border rounded py-2 px-3 text-grey-darker w-full mb-2"
                        value={newNotification.header}
                        onChange={(e) => setNewNotification({ ...newNotification, header: e.target.value })}
                    />
                    <textarea
                        placeholder="Description"
                        className="shadow appearance-none border rounded py-2 px-3 text-grey-darker w-full mb-2"
                        value={newNotification.description}
                        onChange={(e) => setNewNotification({ ...newNotification, description: e.target.value })}
                        rows="4"
                    ></textarea>
                    <button
                        onClick={addNotification}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        OK
                    </button>
                </div>
            )}
           <ul>
                {notifications.map((notification) => (
                    <li key={notification.id} className="mb-2 p-2 shadow rounded flex justify-between items-center">
                        <div>
                            <h2 className="font-bold">{notification.header}</h2>
                            <p>ID: {notification.Id}</p>

                            <p>{notification.description}</p>
                            <p className="text-sm text-gray-600">{formatDate(notification.createdAt)}</p>
                        </div>
                        <button
                            onClick={() => deleteNotification(notification.Id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default NotificationsPage;
