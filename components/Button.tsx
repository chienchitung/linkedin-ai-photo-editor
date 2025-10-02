import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transform hover:scale-105 hover:bg-blue-700 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:bg-gray-400"
    >
      {children}
    </button>
  );
};
