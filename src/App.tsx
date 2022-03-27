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
  // TODO: Make all properties required once I delete hard-coded games
  winner: string,     
  players: player[]
  start?: string,
  end: string,
  duration?: string
  wonder?: string,
  points?: {
    military: number,
    treasury: number,
    wonder: number,
    civilian: number,
    scientific: number,
    commercial: number,
    guild: number
  }
}

export interface currentGame {
  players: player[],
  startTime: string,
  wonder: string
}

export interface wonder {
  name: string,
  uniqueID: string
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
  end: "2022-01-03", 
  winner: "Me",
  players: [{name: "Me", uniqueID: "1"}, {name: "Sam", uniqueID: "2"}]
}

const gameTwo: gameResult = {
  end: "2022-01-16",
  winner: "Silvia",
  players: [{name: "Me", uniqueID: "1"}, {name: "Silvia", uniqueID: "2"}, {name: "Fermin", uniqueID: "3"}]
};

const wonders: wonder[] = [
  {
    name: "Olimpia",
    uniqueID: "1"
  }
]

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
    players: [],
    wonder: ""
  });
  const [results, setResults] = useState(gameResults);
  const [playersList, setPlayersList] = useState(players);
  const [checkedPlayersList, setCheckedPlayersList] = useState([playersList[0].uniqueID]);
  const [wonderValue, setWonderValue] = useState(wonders[0].uniqueID);

  const addGameResult = (singleGameResult: gameResult) => {
    setResults([
      ...results 
      , singleGameResult
    ]);

    setCheckedPlayersList([playersList[0].uniqueID]); // Resetting the checked players for a new game
  };

  const addPlayer = (newPlayer: player) => {
    setPlayersList([
      ...playersList,
      newPlayer
    ]);

    setCheckedPlayersList([...checkedPlayersList, newPlayer.uniqueID]); // New added players are checked by default
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home gameResults={ results } />} />
        <Route path="setup-game" 
               element={<SetupGame 
                  players={ playersList } 
                  addPlayer={addPlayer} 
                  setCurrentGame={setCurrentGame}
                  checkedPlayersList={checkedPlayersList} 
                  setCheckedPlayersList={setCheckedPlayersList}
                  wonders={wonders}
                  wonderValue={wonderValue}
                  setWonderValue={setWonderValue}
                  />
              } />
        <Route path="fun-facts" element={<FunFacts />} />
        <Route path="end-of-game-scoring" element={<EndOfGameScoring addGameResult={ addGameResult } currentGame={currentGame}/>} />
      </Routes>
    </div>
  );
};

export default App;
