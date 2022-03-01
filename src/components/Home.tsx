import Logo from '../assets/Logo.png';
import Button from '@mui/material/Button';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import GamesHistory from "./Games-history";
import '../styles/Home.css';

const Home = (props: any) => {
    const nav = useNavigate();

    return (
        <>
            <img src={Logo} className="Home-logo" alt="logo" />
            <Stack className="Home-buttons-section" spacing={3}>
                <Button variant="contained" startIcon={<CasinoOutlinedIcon />} size="large" color="success" onClick={() => nav("/new-game")}>
                    New Game
                </Button>
                <Button variant="contained" startIcon={<AnalyticsOutlinedIcon />} size="large" color="success" onClick={() => nav("/fun-facts")}>
                    Fun Facts
                </Button>
            </Stack>
            <div style={{ width: "80%"}}>
                <GamesHistory games={props} />
            </div>
        </>
    );
};

export default Home;
