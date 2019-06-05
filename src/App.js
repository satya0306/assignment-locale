import React from 'react';
import SimpleMap from './SimpleMap';
import './App.css';
import CsvToJson from './CsvToJson';

function App() {
  return (
    <div className="App">
      <SimpleMap/>
      <CsvToJson/>
    </div>
  );
}

export default App;
