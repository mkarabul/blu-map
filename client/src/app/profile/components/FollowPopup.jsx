import React from 'react';

function FollowerPopup({ title, list = [], onClose }) {
  const hasUsers = list.length > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-10 rounded-lg shadow-lg" style={{ width: '90%', maxWidth: '800px' }}>
        <h2 className="text-4xl font-bold mb-6">{title}</h2>
        {!hasUsers && (
          <p className="text-xl">User has no {title.toLowerCase()}.</p>
        )}
        <ul className="list-none mt-4 space-y-4">
          {list.map((item, index) => {
            const displayName = item.userName || item.followingUserName;
            return (
              <li key={index} className="text-2xl">
                <a
                  href={`http://localhost:3000/profile/${displayName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {displayName}
                </a>
              </li>
            );
          })}
        </ul>
        <button onClick={onClose} className="mt-6 bg-blue-500 text-white p-3 rounded-lg text-lg transition-colors duration-200 hover:bg-blue-700">Close</button>
      </div>
    </div>
  );
}

export default FollowerPopup;
