import Logo from '../assets/Logo.png';
import Button from '@mui/material/Button';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { gameResult } from '../App';
import GamesHistory from "./Games-history";
import '../styles/Home.css';

interface HomeProps {
    gameResults: gameResult[];
}

const Home: React.FC<HomeProps> = ({ gameResults }) => {
    const nav = useNavigate();

    return (
        <>
            <Button onClick={() => nav("/")}><img src={Logo} className="Home-logo" alt="logo" /></Button>
            <Stack className="Home-buttons-section" spacing={3}>
                <Button variant="contained" startIcon={<CasinoOutlinedIcon />} size="large" color="success" onClick={() => nav("/setup-game")}>
                    New Game
                </Button>
                <Button variant="contained" startIcon={<AnalyticsOutlinedIcon />} size="large" color="success" onClick={() => nav("/fun-facts")}>
                    Fun Facts
                </Button>
            </Stack>
            <div style={{ width: "80%"}}>
                <GamesHistory gamesData={gameResults} />
            </div>
        </>
    );
};

export default Home;
