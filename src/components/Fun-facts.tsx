import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../styles/Fun-facts.css';

const cardOne = (
    <React.Fragment>
      <CardContent className='cardContent'>
        <Typography variant="body1" component="div">
            Wins
        </Typography>
        <Typography variant="body1" component="div">
            #
        </Typography>
      </CardContent>
      <CardContent className='cardContent'>
        <Typography variant="body1" component="div">
            Loses
        </Typography>
        <Typography variant="body1" component="div">
            #
        </Typography>
      </CardContent>
      <CardContent className='cardContent'>
        <Typography variant="body1" component="div">
            Quit
        </Typography>
        <Typography variant="body1" component="div">
            #
        </Typography>
      </CardContent>
      <CardContent className='cardContent'>
        <Typography variant="body1" component="div">
            Wins %
        </Typography>
        <Typography variant="body1" component="div">
            #
        </Typography>
      </CardContent>
      <CardContent className='cardContent'>
        <Typography variant="body1" component="div">
            Loses %
        </Typography>
        <Typography variant="body1" component="div">
            #
        </Typography>
      </CardContent>
    </React.Fragment>
);

const cardTwo = (
    <React.Fragment>
        <h3>Latest Game</h3>
        <CardContent className='cardContent'>
            <Typography variant="body1" component="div">
                Total Points
            </Typography>
            <Typography variant="body1" component="div">
                #
            </Typography>
        </CardContent>
        <CardContent className='cardContent'>
            <Typography variant="body1" component="div">
                Duration
            </Typography>
            <Typography variant="body1" component="div">
                #
            </Typography>
        </CardContent>
    </React.Fragment>
);

const cardThree = (
    <React.Fragment>
        <h2>Cool Stats</h2>
        <CardContent className='cardContent'>
            <Typography variant="body1" component="div">
                Longest game
            </Typography>
            <Typography variant="body1" component="div">
                #
            </Typography>
        </CardContent>
        <CardContent className='cardContent'>
            <Typography variant="body1" component="div">
                Shortest game
            </Typography>
            <Typography variant="body1" component="div">
                #
            </Typography>
        </CardContent>
        <CardContent className='cardContent'>
            <Typography variant="body1" component="div">
                Average Game Duration
            </Typography>
            <Typography variant="body1" component="div">
                #
            </Typography>
        </CardContent>
        <h3 style={{textAlign: "left", paddingLeft: "0.7em", color: "#c86d0f"}}>Most Points in a Game</h3>
        <CardContent className='cardContent'>
            <Typography variant="body1" component="div">
                Victory Points
            </Typography>
            <Typography variant="body1" component="div">
                #
            </Typography>
        </CardContent>
        <CardContent className='cardContent'>
            <Typography variant="body1" component="div">
                Military Points
            </Typography>
            <Typography variant="body1" component="div">
                #
            </Typography>
        </CardContent>
        <CardContent className='cardContent'>
            <Typography variant="body1" component="div">
                Treasury Points
            </Typography>
            <Typography variant="body1" component="div">
                #
            </Typography>
        </CardContent>
        <CardContent className='cardContent'>
            <Typography variant="body1" component="div">
                Wonder Points
            </Typography>
            <Typography variant="body1" component="div">
                #
            </Typography>
        </CardContent>
        <CardContent className='cardContent'>
            <Typography variant="body1" component="div">
                Civilian Points
            </Typography>
            <Typography variant="body1" component="div">
                #
            </Typography>
        </CardContent>
        <CardContent className='cardContent'>
            <Typography variant="body1" component="div">
                Scientific Points
            </Typography>
            <Typography variant="body1" component="div">
                #
            </Typography>
        </CardContent>
        <CardContent className='cardContent'>
            <Typography variant="body1" component="div">
                Commercial Points
            </Typography>
            <Typography variant="body1" component="div">
                #
            </Typography>
        </CardContent>
        <CardContent className='cardContent'>
            <Typography variant="body1" component="div">
                Guild Points
            </Typography>
            <Typography variant="body1" component="div">
                #
            </Typography>
        </CardContent>
    </React.Fragment>
);

const FunFacts = () => {
    const nav = useNavigate();

    return (
        <> 
           <Button onClick={() => nav("/")}><img src={Logo} className="Small-logo" alt="logo" /></Button>
           <h1>Fun Facts</h1>
           <Box sx={{ minWidth: 300 }}>
                <Card className='card' variant="outlined">{cardOne}</Card>
                <Card className='card' variant="outlined">{cardTwo}</Card>
                <Card className='card' variant="outlined">{cardThree}</Card>
            </Box>
        </>
    );
};

export default FunFacts;