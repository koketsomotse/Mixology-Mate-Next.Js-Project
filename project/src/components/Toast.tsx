import React from 'react';

interface ToastProps {
  message: string;
  type: string;
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  if (!message) return null;

  const bgColor = type === 'warning' ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded shadow-lg`}>
      {message}
    </div>
  );
};

export default Toast;