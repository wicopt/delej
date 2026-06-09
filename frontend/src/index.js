import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';/*сначала бутсрап потом свои, что бы label::after был важнее сполйлер не помогло */
import './shared/styles/global.css';  
import './shared/assets/fonts/fonts.css';  
import { getEventIcon } from "./shared/assets/constants/EventIcons";

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
