import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from "./components/Home";
import NewGame from "./components/New-game";
import FunFacts from "./components/Fun-facts";
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games-history" element={<Home />} />
        <Route path="new-game" element={<NewGame />} />
        <Route path="fun-facts" element={<FunFacts />} />
      </Routes>
    </div>
  );
};

export default App;
