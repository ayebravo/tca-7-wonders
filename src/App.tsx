import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import SetupGame from "./components/Setup-game";
import FunFacts from "./components/Fun-facts";
import EndOfGameScoring from "./components/EndOfGame-Scoring";
import './App.css';


export interface player {
  name: string;
  uniqueID: string;
}

export interface gameResult {
  // TODO: Add function to calculate duration
  // TODO: See how to update a game's formattedDate and duration properties
  formattedDate: string,
  winner: string,     
  players: player[]
  start?: string,
  end?: string,
  duration?: string
}

export interface currentGame {
  players: player[],
  startTime: string,
}

const playerOne: player = {
  name: "Me",
  uniqueID: "1"
}

const playerTwo: player = {
  name: "Sam",
  uniqueID: "2"
}

const playerThree: player = {
  name: "Santi",
  uniqueID: "3"
}

const gameOne: gameResult = {
  formattedDate: "2022-01-03", 
  winner: "Me",
  players: [{name: "Me", uniqueID: "1"}, {name: "Sam", uniqueID: "2"}]
}

const gameTwo: gameResult = {
  formattedDate: "2022-01-16",
  winner: "Silvia",
  players: [{name: "Me", uniqueID: "1"}, {name: "Silvia", uniqueID: "2"}, {name: "Fermin", uniqueID: "3"}]
};

const gameResults: gameResult[] = [
  gameOne,
  gameTwo
];

const players: player[] = [
  playerOne,
  playerTwo,
  playerThree
]

const App: React.FC = () => {

  const [currentGame, setCurrentGame] = useState<currentGame>({
    startTime: "",
    players: []
  });
  const [results, setResults] = useState(gameResults);
  const [playersList, setPlayersList] = useState(players);

  const addGameResult = (singleGameResult: gameResult) => {
    setResults([
      ...gameResults 
      , singleGameResult
    ]);
  };

  const addPlayer = (newPlayer: player) => {
    setPlayersList([
      ...playersList,
      newPlayer
    ])
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home gameResults={ results } />} />
        <Route path="setup-game" element={<SetupGame players={ playersList } addPlayer={addPlayer} setCurrentGame={setCurrentGame}/>} />
        <Route path="fun-facts" element={<FunFacts />} />
        <Route path="end-of-game-scoring" element={<EndOfGameScoring addGameResult={ addGameResult } currentGame={currentGame}/>} />
      </Routes>
    </div>
  );
};

export default App;
