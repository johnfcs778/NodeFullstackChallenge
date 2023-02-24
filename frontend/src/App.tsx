/**
 *  This file defines the startup point for the frontend
 *  Author: John Fahnestock
 */
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApplicationForm from './ApplicationForm/ApplicationForm';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="application" element={<ApplicationForm />} />
        </Routes>
    </Router>
  );
}

export default App;
