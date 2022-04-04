import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import ButtonGroup from '@mui/material/ButtonGroup';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Logo from '../assets/Logo.png';
import { currentGame, gameResult } from '../App';
import '../styles/GameResult.css';

interface GameResultProps {
    gameResults: gameResult[],
    addGameResult: (result: gameResult) => void,
    gameScores: number[],
    currentGame: currentGame
}

const GameResult: React.FC<GameResultProps> = ({ gameResults, addGameResult, gameScores, currentGame }) => {
    const nav = useNavigate();
    const [latestGameTotalScore, setLatestGameTotalScore] = useState(0);
    const [gameResultSelection, setGameResultSelection] = useState("");

    useEffect(() => {
        const totalScore = gameScores.length > 0 ? gameScores.reduce((partialSum, a) => partialSum + a, 0) : 0;
        setLatestGameTotalScore(totalScore);
    }, [gameScores]);

    useEffect(() => {
        if (gameResultSelection !== "") {
            endGame();
        }
    }, [gameResultSelection]);

    const addWonGame = () => {
        setGameResultSelection("W");
    }

    const addLostGame = () => {
        setGameResultSelection("L");
    }

    const endGame = () => {
        // Add the new game result to the app data
        addGameResult({
            start: currentGame.startTime,
            end: new Date().toISOString(),
            gameResult: gameResultSelection,
            players: currentGame.players,
            wonder: currentGame.wonder,
            points: {
                military: gameScores[0],
                treasury: gameScores[1],
                wonder: gameScores[2],
                civilian: gameScores[3],
                scientific: gameScores[4],
                commercial: gameScores[5],
                guild: gameScores[6]
            },
            totalScore: latestGameTotalScore
        });

        // Navigate to the home page
        nav("/");
    }
    
    return (
        <div className="gameResultContainer"> 
            <Button onClick={() => nav("/")}><img src={Logo} className="Small-logo" alt="logo" /></Button>
            <h1>Game Result</h1>
            
            <Card sx={{ minWidth: 200, marginBottom: "2em" }}>
                <CardContent>
                    <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        Your Total Score:
                    </Typography>
                    <Typography variant="h5" component="div">
                        {latestGameTotalScore}
                    </Typography>
                </CardContent>
            </Card>

            <div className='selectGameResultContainer'>
                {/* TODO: Fix that when I add the Typography element, it makes my card element get wider */}
                {/* <Typography variant="subtitle1">
                    Compare your total score with the other players' score. How did you do?
                </Typography> */}

                <ButtonGroup className='GameResultButtons' variant="contained" aria-label="outlined primary button group" size='large'>
                    <Button onClick={ addWonGame }>I Won</Button>
                    <Button onClick={ addLostGame }>I Lost</Button>
                </ButtonGroup>
            </div>
        </div>
    );
}

export default GameResult;