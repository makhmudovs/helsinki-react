import React from "react";

const Notification = ({ message, color }: { message: any; color: string }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="message" style={{ color: color }}>
      {message}
    </div>
  );
};

export default Notification;
