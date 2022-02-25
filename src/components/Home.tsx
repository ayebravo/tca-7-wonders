import Logo from '../assets/Logo.png';
import Button from '@mui/material/Button';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import Stack from '@mui/material/Stack';
import '../styles/Home.css';

const Home = () => {
    return (
        <>
            <img src={Logo} className="Home-logo" alt="logo" />
            <Stack className="Home-buttons-section" spacing={3}>
                <Button variant="contained" startIcon={<CasinoOutlinedIcon />} size="large" color="success">
                    New Game
                </Button>
                <Button variant="contained" startIcon={<AnalyticsOutlinedIcon />} size="large" color="success">
                    Fun Facts
                </Button>
                <Button variant="contained" startIcon={<TimelineOutlinedIcon />} size="large" color="success">
                    Games History
                </Button>
            </Stack>
        </>
    );
};

export default Home;
