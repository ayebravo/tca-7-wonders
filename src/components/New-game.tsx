import Logo from '../assets/Logo.png';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import '../styles/New-game.css';

const NewGame = () => {
    const nav = useNavigate();
    
    return (
        <>
           <Button onClick={() => nav("/")}><img src={Logo} className="Small-logo" alt="logo" /></Button>
           <h1>New game - Stage 1</h1>
        </>
    );
};

export default NewGame;