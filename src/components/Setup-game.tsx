import Logo from '../assets/Logo.png';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import PlayersList from './PlayersList';
import WondersList from './WondersList';
import Typography from '@mui/material/Typography';
import { player } from '../App';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../styles/Setup-game.css';

interface SetupGameProps {
    players: player[]
}

const SetupGame: React.FC<SetupGameProps> = ({ players }) => {
    const nav = useNavigate();
    
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
                noValidate
                autoComplete="off"
                >
                <div className='addPlayerContainer'>
                    <TextField label="Player's name" id="outlined-size-normal" size='small' />
                    <Button variant="outlined" size="medium" color="success">
                        Add player
                    </Button>
                </div>
            </Box>
            <div className='selectWonderContainer'>
                <Typography  variant="h6">Select Wonder (board): </Typography>
                <WondersList />
            </div>
           <Button variant="contained" size="large" color="success" onClick={() => nav("/game-stage1")}>Play Game</Button>
           {/* When play game button is clicked, I want to get the start time timestamp for the current game */}
        </div>
    );
};

export default SetupGame;