import Logo from '../assets/Logo.png';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import PlayersList from './PlayersList';
import '../styles/Setup-game.css';
import { player } from '../App';

interface SetupGameProps {
    players: player[]
}

const SetupGame: React.FC<SetupGameProps> = ({ players }) => {
    const nav = useNavigate();
    
    return (
        <>
           <Button onClick={() => nav("/")}><img src={Logo} className="Small-logo" alt="logo" /></Button>
            <div className='selectPlayersContainer'>
                <p>Players: </p>
                <PlayersList playersData={ players } />
            </div>
           <Button variant="contained" size="large" color="success" onClick={() => nav("/game-stage1")}>Play Game</Button>
           {/* When play game button is clicked, I want to get the start time timestamp for the current game */}
        </>
    );
};

export default SetupGame;