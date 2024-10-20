import React from "react";

function Card({ children, className, onClick }) {
  return (
    <div
      className={`rounded-lg overflow-hidden shadow-md ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

Card.Header = ({ children }) => <div className="w-full">{children}</div>;
Card.Content = ({ children }) => <div className="p-4">{children}</div>;
Card.Title = ({ children, className }) => (
  <h2 className={`text-xl font-bold ${className}`}>{children}</h2>
);

export default Card;
