import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Notification = () => {
  const { message } = useSelector((state: RootState) => state.anecdote);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  if (message !== "") {
    return <div style={style}>{message}</div>;
  } else {
    return null;
  }
};

export default Notification;
