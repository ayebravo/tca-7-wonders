import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import localforage from 'localforage';
import Home from "./components/Home";
import SetupGame from "./components/Setup-game";
import FunFacts from "./components/Fun-facts";
import EndOfGameScoring from "./components/EndOfGame-Scoring";
import GameResult from './components/GameResult';
import './App.css';

const prettyMilliseconds = require('pretty-ms');


export interface player {
  name: string;
  uniqueID: string;
}

export interface gameResult {
  gameResult: string,     
  players: player[]
  start: string,
  end: string,
  duration: number
  wonder: string,
  points: {
    military: number,
    treasury: number,
    wonder: number,
    civilian: number,
    scientific: number,
    commercial: number,
    guild: number
  },
  totalScore: number
}

export interface stats {
  wins: number,
  loses: number,
  quits: number,
  winsPercentage: number,
  losesPercentage: number,
  longestGameDuration: number,
  shortestGameDuration: number,
  lastGameTotalScore: number,
  lastGameWonder: string,
  lastGameDuration: number,
  avgGameLength: number,
  mostMilitaryPoints: number,
  mostTreasuryPoints: number,
  mostWonderPoints: number,
  mostCivilianPoints: number,
  mostScientificPoints: number,
  mostCommercialPoints: number,
  mostGuildPoints: number
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

const wonders: wonder[] = [
  {
    name: "Olimpia",
    uniqueID: "1B"
  },
  {
    name: "Alexandria",
    uniqueID: "2B"
  },
  {
    name: "Babylon",
    uniqueID: "3B"
  },
]

const players: player[] = [
  playerOne
]

const App: React.FC = () => {

  const loadGameResults = async () => {
    try {
      const results = await localforage.getItem<gameResult[]>("gameResults");
      setResults(results ?? []);
    }

    catch(err) {
      console.error(err);
      setResults([]);
    }
  };

  const loadPreviousPlayers = async () => {
    try {
      const playersList = await localforage.getItem<player[]>("previousPlayers");
      setPlayersList(playersList ?? players);
    }

    catch(err) {
      console.error(err);
      setPlayersList(players);
    }
  };

  useEffect(
    () => {
      loadGameResults();
      loadPreviousPlayers();
    }, []
  );

  const [currentGame, setCurrentGame] = useState<currentGame>({
    startTime: "",
    players: [],
    wonder: ""
  });
  const [results, setResults] = useState<gameResult[]>([]);
  const [playersList, setPlayersList] = useState<player[]>(players);
  const [checkedPlayersList, setCheckedPlayersList] = useState([playersList[0]?.uniqueID] ?? "");
  const [wonderValue, setWonderValue] = useState(wonders[0]?.uniqueID ?? "");
  const [gameScores, setGameScores] = useState<number[]>([]);
  const [gamesStats, setGamesStats] = useState<stats>({
    wins: 0,
    loses: 0,
    quits: 0,
    winsPercentage: 0,
    losesPercentage: 0,
    longestGameDuration: 0,
    shortestGameDuration: 0,
    lastGameTotalScore: 0,
    lastGameDuration: 0,
    avgGameLength: 0,
    lastGameWonder: "N/A",
    mostMilitaryPoints: 0,
    mostTreasuryPoints: 0,
    mostWonderPoints: 0,
    mostCivilianPoints: 0,
    mostScientificPoints: 0,
    mostCommercialPoints: 0,
    mostGuildPoints: 0
  });

  const getGameDuration = (game: gameResult) => {
    const gameStartTime = Date.parse(game.start);
    const gameEndTime = Date.parse(game.end);
    const gameDuration = gameEndTime - gameStartTime;
    return gameDuration;
  };
 
  const addGameResult = async (singleGameResult: gameResult) => {
    singleGameResult = {...singleGameResult, duration: getGameDuration(singleGameResult)};

    const updatedResults = [
      ...results 
      , singleGameResult
    ];

    const savedResults = await localforage.setItem('gameResults', updatedResults);

    setResults(savedResults);

    setGameScores([]); // Resetting gameScores before starting a new game
    setWonderValue(wonders[0].uniqueID); // Resetting the wonder value, so the first one appears checked by default on a new game
    setCheckedPlayersList([playersList[0]?.uniqueID]); // Resetting the checked players for a new game
  };

  const addPlayer = async (newPlayer: player) => {
    
    const updatedPlayers = [
      ...playersList 
      , newPlayer
    ];

    const savedPlayers = await localforage.setItem('previousPlayers', updatedPlayers);

    setPlayersList(savedPlayers);
    setCheckedPlayersList([...checkedPlayersList, newPlayer?.uniqueID]); // New added players are checked by default
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
        <Route path="fun-facts" 
               element={<FunFacts gamesStats={gamesStats} setGamesStats={setGamesStats} gameResults={ results }/>} />
        <Route path="end-of-game-scoring" 
               element={<EndOfGameScoring 
                  currentGame={currentGame} 
                  gameScores={gameScores} 
                  setGameScores={setGameScores}
                  addGameResult={ addGameResult }
              />} />
        <Route path="game-result" 
               element={<GameResult 
                  gameResults={ results } 
                  gameScores={gameScores}
                  currentGame={currentGame}
                  addGameResult={ addGameResult }
          />} />
      </Routes>
    </div>
  );
};

export default App;
