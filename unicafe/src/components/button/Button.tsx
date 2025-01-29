import React from "react";

interface ButtonItems {
  onClick: () => void;
  text: string;
}

const Button: React.FC<ButtonItems> = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);

export default Button;
