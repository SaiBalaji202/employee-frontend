import React from 'react';
import './App.css';
import Employee from './employees/pages/Employee';
import {ToastContainer} from 'react-toastify';

function App () {
  return (
    <div className="App">
      <ToastContainer />
      <Employee />
    </div>
  );
}

export default App;
