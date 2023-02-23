import React, {useEffect} from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApplicationForm from './ApplicationForm/ApplicationForm';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  // useEffect(() => {
  //   axios.get("api/v1").then(reponse => {
  //     console.log(reponse.data)
  //   })
  // }, [])
  return (
    <Router>
        <Routes>
          <Route path="application" element={<ApplicationForm />} />
        </Routes>
    </Router>
  );
}

export default App;
