import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './redux/store.js';

/**
 * Application Entry Point
 * =========================================================================
 * Initializes the React root and injects global context providers.
 * 
 * Providers Layer:
 * 1. BrowserRouter: Orchestrates client-side routing.
 * 2. Provider (Redux): Makes the central store available application-wide.
 * 3. App: The root functional component containing the main layout and routes.
 * 4. ToastContainer: Handles global error and success notifications (Toasts).
 *
 * Mounting: Attaches to the DOM element with ID 'root'.
 */
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </BrowserRouter>,
);

