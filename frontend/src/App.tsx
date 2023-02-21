import React, {useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get("api/v1").then(reponse => {
      console.log(reponse.data)
    })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <h1>HI</h1>
      </header>
    </div>
  );
}

export default App;
