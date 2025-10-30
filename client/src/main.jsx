import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <App />
      <Toaster
        position="top-right"
        richColors
        closeButton
        expand={false}
        toastOptions={{
          classNames: {
            toast:
              "rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 py-3",
            title: "text-gray-900 dark:text-white font-medium text-sm",
            description: "text-gray-600 dark:text-gray-300 text-xs",
            closeButton:
              "hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-1 transition-all",
          },
        }}
      />
    </StrictMode>
  </BrowserRouter>
);
