import Logo from '../assets/Logo.png';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { gameResult } from '../App';
import '../styles/Fun-facts.css';

interface NewGameProps {
    addGameResult: (result: gameResult) => void;
}

const GameStageThree: React.FC<NewGameProps> = ({addGameResult}) => {
    const nav = useNavigate();

    const endGame = () => {
        // Add the new game result to the app data
        addGameResult({
            formattedDate: "3/01/22",
            winner: "Me",
            players: [{name: "Me", order: 1}, {name: "Sam", order: 2}, {name: "Mike", order: 3}]
        });

        // Navigate to the Home page
        nav("/");
    }

    return (
        <> 
           <Button onClick={() => nav("/")}><img src={Logo} className="Small-logo" alt="logo" /></Button>
           <h1>Game Stage Three page</h1>
           <Button variant="contained" size="large" color="success" onClick={ endGame }>Done</Button>
        </>
    );
};

export default GameStageThree;