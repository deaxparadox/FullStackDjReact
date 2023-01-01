import React from 'react';
import {BrowserRouter, Routes, Route, Link, createBrowserRouter} from 'react-router-dom'; 

import Home from './Pages/home';
import Login from './Pages/login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home userDisplay={false} />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}
