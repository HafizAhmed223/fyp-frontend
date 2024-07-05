import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Components/context/Auth";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-tiobgum7iikpjkwk.us.auth0.com"
      clientId="jH0ij1sGK5Kd5fwlUPWRIi5aczXsn1fR"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <AuthProvider>
        <App />
      </AuthProvider>
    </Auth0Provider>
    <ToastContainer
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      limit={1}
      style={{
        fontFamily: "Arial, sans-serif",
      }}
      toastStyle={{
        background: "linear-gradient(to bottom, #062846, #1E3C72)",
        color: "#ffffff", // Text color
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add shadow for depth
        borderRadius: "8px", // Add border radius for rounded corners
      }}
      progressStyle={{
        background: "#ffffff", // Progress bar color
      }}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
