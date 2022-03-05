import Logo from '../assets/Logo.png';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameResult } from '../App';
import '../styles/New-game.css';

interface NewGameProps {
    addGameResult: (result: gameResult) => void;
}

const NewGame: React.FC<NewGameProps> = ({addGameResult}) => {
    const nav = useNavigate();

    const endGame = () => {
        // Add the new game result to the app data
        addGameResult({
            formattedDate: "3/01/22",
            winner: "Me",
            players: [{name: "Me", order: 1}, {name: "Santi", order: 2}]
        });

        // Navigate to the Home page
        nav("/");
    }
    
    return (
        <>
           <Button onClick={() => nav("/")}><img src={Logo} className="Small-logo" alt="logo" /></Button>
           <h1>New game - Stage 1</h1>
           <Button variant="contained" size="large" color="success" onClick={ endGame }>Done</Button>
        </>
    );
};

export default NewGame;