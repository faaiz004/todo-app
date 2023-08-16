import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Main from './components/Main';
function App() {
  const [night,setNight] = useState(true)
  return (
    <div className="App flex justify-center bg-very-dark-blue transition-colors ease-linear pt-16" style = {!night ? {backgroundColor : "#E8E8E8"} : {}}>
      <Main night = {night}
            setNight = {setNight}  
      />
    </div>
  );
}

export default App;
