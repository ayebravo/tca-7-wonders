import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import ButtonGroup from '@mui/material/ButtonGroup';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Logo from '../assets/Logo.png';
import { gameResult } from '../App';
import '../styles/GameResult.css';

interface GameResultProps {
    gameResults: gameResult[],
    addGameResult: (result: gameResult) => void,
    setGameResultSelection: (result: string) => void,
    gameResultSelection: string
}

const GameResult: React.FC<GameResultProps> = ({ gameResults, setGameResultSelection, addGameResult, gameResultSelection }) => {
    const nav = useNavigate();
    const [latestGameTotalScore, setLatestGameTotalScore] = useState(0);

    useEffect(() => {
        if (gameResults && gameResults.length > 0 && gameResults[gameResults.length - 1].totalScore) {
            const totalScore = gameResults[gameResults.length - 1].totalScore !== undefined ? gameResults[gameResults.length - 1].totalScore : latestGameTotalScore;
            setLatestGameTotalScore(totalScore);
        }
    }, [gameResults]);

    // TODO: Fix that adding the game's winner based on user's button clicked is not working
    const addWonGame = () => {
        setGameResultSelection("W");
        // gameResults[gameResults.length - 1].winner = gameResultSelection;
        nav("/");
    }

    const addLostGame = () => {
        setGameResultSelection("L");
        // gameResults[gameResults.length - 1].winner = gameResultSelection;

        // addGameResult({
        //     ...gameResults[gameResults.length - 1],
        //     winner: gameResultSelection
        // });
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