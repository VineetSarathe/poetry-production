import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from "./context/LanguageContext";
import { BrowserRouter } from "react-router-dom";
import { PoemsProvider } from "./context/PoemsContext";

createRoot(document.getElementById('root')).render(
  <LanguageProvider>
    <BrowserRouter>
    <PoemsProvider>
      <App />
    </PoemsProvider>
    </BrowserRouter>
  </LanguageProvider>

)
