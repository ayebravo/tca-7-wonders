import Logo from '../assets/Logo.png';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import '../styles/Fun-facts.css';

const FunFacts = () => {
    const nav = useNavigate();

    return (
        <> 
           <Button onClick={() => nav("/")}><img src={Logo} className="Small-logo" alt="logo" /></Button>
           <h1>Fun Facts page</h1>
        </>
    );
};

export default FunFacts;