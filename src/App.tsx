// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import SetupGame from "./components/Setup-game";
import FunFacts from "./components/Fun-facts";
import NewGame from "./components/New-game";
import './App.css';

export interface game {
  date: string,
  opponents: string[],
  gameResult: string
}

// Next to-do: add other app data and implement useState so child components get updated state of all game results
const gameResults: game[] = [
  { date: '1/02/22', opponents: ["Me", "Sam"], gameResult: "W"},
  { date: '1/03/22', opponents: ["Me", "Sam", "Silvia"], gameResult: "W"},
  { date: '1/28/22', opponents: ["Me", "Fermin" , "Sam"], gameResult: "L"},
  { date: '2/02/22', opponents: ["Me", "Sam", "Santi", "Vic"], gameResult:  "L"},
  { date: '2/13/22', opponents: ["Me", "Ellen", "Sam"], gameResult: "W"},
  { date: '2/28/22', opponents: ["Me", "Vicky", "Flor"], gameResult: "L"},
];

const App = () => {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home games={ gameResults } />} />
        <Route path="setup-game" element={<SetupGame />} />
        <Route path="fun-facts" element={<FunFacts />} />
        <Route path="new-game" element={<NewGame />} />
      </Routes>
    </div>
  );
};

export default App;
