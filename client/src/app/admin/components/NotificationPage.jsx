"use client"
import React, { useState } from 'react';

const NotificationsPage = ({ themeClasses }) => {
    const [notifications, setNotifications] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [newNotification, setNewNotification] = useState({ header: '', description: '' });

    const toggleInputVisibility = () => {
        setShowInput(!showInput);
        if (showInput) {
            setNewNotification({ header: '', description: '' }); // Reset the input fields if we're closing them
        }
    };

    const addNotification = () => {
        // Here you might want to call an API to save the notification
        setNotifications([...notifications, newNotification]);
        setNewNotification({ header: '', description: '' }); // Reset the input fields
        setShowInput(false); // Hide the input fields again
    };

    const deleteNotification = (indexToDelete) => {
        setNotifications(notifications.filter((_, index) => index !== indexToDelete));
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
                {notifications.map((notification, index) => (
                    <li key={index} className="mb-2 p-2 shadow rounded flex justify-between items-center">
                        <div>
                            <h2 className="font-bold">{notification.header}</h2>
                            <p>{notification.description}</p>
                        </div>
                        <button
                            onClick={() => deleteNotification(index)}
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
