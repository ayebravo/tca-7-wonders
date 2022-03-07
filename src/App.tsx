import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import SetupGame from "./components/Setup-game";
import FunFacts from "./components/Fun-facts";
import NewGame from "./components/Game-stage1";
import GameStageTwo from "./components/Game-stage2";
import GameStageThree from "./components/Game-stage3";
import './App.css';


export interface player {
  name: string;
  order: number;
}

const playerOne: player = {
  name: "Me",
  order: 1
}

const playerTwo: player = {
  name: "Sam",
  order: 2
}

const playerThree: player = {
  name: "Santi",
  order: 3
}

export interface gameResult {
  // TODO: Add function to get formattedDate from game's start and end properties
  // TODO: Add function to calculate duration
  // TODO: See how to update a game's formattedDate and duration properties
  formattedDate: string,
  winner: string,     
  players: player[]
  // start: string,
  // end: string,
  // formattedDate: string,
  // duration: string
}

const gameOne: gameResult = {
  formattedDate: "1/02/22", 
  winner: "Me",
  players: [{name: "Me", order: 1}, {name: "Sam", order: 2}]
}

const gameTwo: gameResult = {
  formattedDate: "1/16/22",
  winner: "Silvia",
  players: [{name: "Me", order: 1}, {name: "Silvia", order: 2}, {name: "Fermin", order: 3}]
};

const gameThree: gameResult = {
  formattedDate: "2/02/22",
  winner: "Me",
  players: [{name: "Me", order: 1}, {name: "Silvia", order: 2}, {name: "Fermin", order: 3}, {name: "Sam", order: 4}]
};

const gameFour: gameResult = {
  formattedDate: "2/25/22",
  winner: "Sam",
  players: [{name: "Me", order: 1}, {name: "Sam", order: 2}]
}

const gameResults: gameResult[] = [
  gameOne,
  gameTwo,
  gameThree,
  gameFour
];

const players: player[] = [
  playerOne,
  playerTwo,
  playerThree
]

const App: React.FC = () => {

  const [results, setResults] = useState(gameResults);

  const addGameResult = (singleGameResult: gameResult) => {
    setResults([
      ...gameResults 
      , singleGameResult
    ]);
  };

  const [playersList, setPlayersList] = useState(players);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home gameResults={ results } />} />
        <Route path="setup-game" element={<SetupGame players={ playersList } />} />
        <Route path="fun-facts" element={<FunFacts />} />
        <Route path="game-stage1" element={<NewGame />} />
        <Route path="game-stage2" element={<GameStageTwo />} />
        <Route path="game-stage3" element={<GameStageThree addGameResult={ addGameResult } />} />
      </Routes>
    </div>
  );
};

export default App;
