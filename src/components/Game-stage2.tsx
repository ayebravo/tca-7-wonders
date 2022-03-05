import Logo from '../assets/Logo.png';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import '../styles/Fun-facts.css';

const GameStageTwo = () => {
    const nav = useNavigate();

    return (
        <> 
           <Button onClick={() => nav("/")}><img src={Logo} className="Small-logo" alt="logo" /></Button>
           <h1>Game Stage Two page</h1>
           <Button variant="contained" size="large" color="success" onClick={() => nav("/game-stage3")}>Start Stage 3</Button>
        </>
    );
};

export default GameStageTwo;