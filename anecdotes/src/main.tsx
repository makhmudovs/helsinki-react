import { createRoot } from "react-dom/client";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { NotificationContextProvider } from "./NotificationContext";

const container = document.getElementById("root");

const queryClient = new QueryClient();

if (container) {
  const root = createRoot(container);

  root.render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </Provider>
    </QueryClientProvider>
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  );
}
