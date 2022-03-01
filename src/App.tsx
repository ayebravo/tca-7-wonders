import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import NewGame from "./components/New-game";
import FunFacts from "./components/Fun-facts";
import './App.css';

const App = () => {

  interface game {
    date: string,
    opponents: string[],
    gameResult: string
  }

  const gameResults: game[] = [
    { date: '1/02/22', opponents: ["Me", "Sam"], gameResult: "W"},
    { date: '1/03/22', opponents: ["Me", "Sam", "Silvia"], gameResult: "W"},
    { date: '1/28/22', opponents: ["Me", "Fermin" , "Sam"], gameResult: "L"},
    { date: '2/02/22', opponents: ["Me", "Sam", "Santi", "Vic"],gameResult:  "L"},
    { date: '2/13/22', opponents: ["Me", "Ellen", "Sam"], gameResult: "W"},
    { date: '2/28/22', opponents: ["Me", "Vicky", "Flor"], gameResult: "L"},
  ];

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home data={ gameResults } />} />
        <Route path="new-game" element={<NewGame />} />
        <Route path="fun-facts" element={<FunFacts />} />
      </Routes>
    </div>
  );
};

export default App;
