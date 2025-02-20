import { useNotificationValue } from "../NotificationContext";

const Notification: React.FC = () => {
  const notification = useNotificationValue();

  if (!notification || !notification.msg) return null;

  const style: React.CSSProperties = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  return (
    <div
      style={{
        ...style,
        borderColor: notification.msgType === "success" ? "green" : "red",
      }}
    >
      {notification.msg}
    </div>
  );
};

export default Notification;
