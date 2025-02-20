import {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useContext,
} from "react";

// Define state type
interface NotificationState {
  msg: string;
  msgType: string;
}

// Define action types
type Action =
  | { type: "ERR"; payload: string }
  | { type: "SUCC"; payload: string }
  | { type: "RESET" };

// Define reducer function with proper types
const counterReducer = (
  state: NotificationState,
  action: Action
): NotificationState => {
  switch (action.type) {
    case "ERR":
      return { msg: action.payload, msgType: "error" };
    case "SUCC":
      return { msg: action.payload, msgType: "success" };
    case "RESET":
      return { msg: "", msgType: "" };
    default:
      return state;
  }
};

type NotificationContextType =
  | [NotificationState, Dispatch<Action>]
  | undefined;
const NotificationContext = createContext<NotificationContextType>(undefined);

interface NotificationContextProviderProps {
  children: ReactNode;
}

export const NotificationContextProvider: React.FC<
  NotificationContextProviderProps
> = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(counterReducer, {
    msg: "",
    msgType: "",
  });

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hooks with proper context checks
export const useNotificationValue = (): NotificationState => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useCounterValue must be used within a CounterContextProvider"
    );
  }
  return context[0];
};

export const useNotificationDispatch = (): Dispatch<Action> => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useCounterDispatch must be used within a CounterContextProvider"
    );
  }
  return context[1];
};

export default NotificationContext;
