import Logo from '../assets/Logo.png';
import Button from '@mui/material/Button';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import GamesHistory from "./Games-history";
import '../styles/Home.css';

const Home = () => {

    const nav123 = useNavigate();

    return (
        <>
            <img src={Logo} className="Home-logo" alt="logo" />
            <Stack className="Home-buttons-section" spacing={3}>
                <Button variant="contained" startIcon={<CasinoOutlinedIcon />} size="large" color="success" onClick={() => nav123("/new-game")}>
                    New Game
                </Button>
                <Button variant="contained" startIcon={<AnalyticsOutlinedIcon />} size="large" color="success" onClick={() => nav123("/fun-facts")}>
                    Fun Facts
                </Button>
            </Stack>
            <div id="gamesHistory">
                <GamesHistory />
            </div>
        </>
    );
};

export default Home;
