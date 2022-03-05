import Logo from '../assets/Logo.png';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import '../styles/New-game.css';

const NewGame = () => {
    const nav = useNavigate();
    
    return (
        <>
           <Button onClick={() => nav("/")}><img src={Logo} className="Small-logo" alt="logo" /></Button>
           <h1>Game Stage 1 page</h1>
           <Button variant="contained" size="large" color="success" onClick={() => nav("/game-stage2")}>Start Stage 2</Button>
        </>
    );
};

export default NewGame;