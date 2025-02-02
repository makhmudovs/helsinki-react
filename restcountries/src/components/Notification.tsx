import React from "react";

interface NotificationProps {
  message: string;
  color: string;
}

const Notification: React.FC<NotificationProps> = ({ message, color }) => {
  if (message === "") {
    return null;
  }
  return (
    <div className="message" style={{ color: color }}>
      {message}
    </div>
  );
};

export default Notification;
