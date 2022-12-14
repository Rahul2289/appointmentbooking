import React from 'react';
import ReactDOM from 'react-dom/client';
import Thanku from './../pages/Thanku';
import { AppProvider } from '../context/context';
import '../App.css';
import '../index.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
export const ThankYou = () => {
  return <Thanku />;
};

ReactDOM.createRoot(document.getElementById('roots')).render(
  <AppProvider>
    <ThankYou />
  </AppProvider>
);
