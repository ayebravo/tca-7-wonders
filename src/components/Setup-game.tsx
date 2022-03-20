import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Logo from '../assets/Logo.png';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import PlayersList from './PlayersList';
import WondersList from './WondersList';
import Typography from '@mui/material/Typography';
import { player } from '../App';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
import '../styles/Setup-game.css';

interface SetupGameProps {
    players: player[],
    addPlayer: (p: player) => void;
}

const SetupGame: React.FC<SetupGameProps> = ({ players, addPlayer }) => {
    const [newPlayerInput, setNewPlayerInput] = useState("");
    const nav = useNavigate();

    const displayNameExistsErrorMessage = () => {
        // <Stack sx={{ width: '100%' }} spacing={2}>
        //     <Alert severity="error">The entered name already exists</Alert>
        // </Stack>
        alert("The entered name already exists");
    }

    const addPlayerToList = () => {
        const newPlayerInputFormatted = (newPlayerInput.charAt(0).toUpperCase() + newPlayerInput.slice(1)).trim();
        // Check if the input exist as a name in the players object
        const isNameInTheList = players.map(player => player.name).includes(newPlayerInputFormatted);
        const newUniqueID = uuidv4();

        if (isNameInTheList === false) {
            addPlayer({
                name: newPlayerInputFormatted,
                uniqueID: newUniqueID
            });
        } else {
            displayNameExistsErrorMessage()
        }
        
        setNewPlayerInput(""); // Reset new player's input to reset the text field
    }

    const handleInputChange = (event: any) => {
        setNewPlayerInput(event.target.value);
    }
    
    return (
        <div className='setupGameContainer'>
           <Button onClick={() => nav("/")}><img src={Logo} className="Small-logo" alt="logo" /></Button>
            <div className='selectPlayersContainer'>
                <Typography  variant="h6">Select Players: </Typography>
                <PlayersList playersData={ players } />
            </div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '18ch' },
                }}
                autoComplete="off"
                noValidate
                >
                <div className='addPlayerContainer'>
                    <TextField 
                        label="Player's name" 
                        id="outlined-size-normal" 
                        size='small' 
                        value={newPlayerInput}
                        onChange={handleInputChange}
                    />
                    <Button variant="outlined" size="medium" color="success" onClick={ addPlayerToList }>
                        Add player
                    </Button>
                </div>
            </Box>
            <div className='selectWonderContainer'>
                <Typography  variant="h6">Select Wonder (board): </Typography>
                <WondersList />
            </div>
           <Button variant="contained" size="large" color="success" onClick={() => nav("/end-of-game-scoring")}>Add my scores</Button>
           {/* When play game button is clicked, I want to get the start time timestamp for the current game */}
        </div>
    );
};

export default SetupGame;