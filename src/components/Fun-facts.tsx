import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../styles/Fun-facts.css';
import { gameResult, stats } from '../App';

interface FunFactsProps {
    gamesStats: stats,
    setGamesStats: (stat: any) => void,
    gameResults: gameResult[],
}

const FunFacts: React.FC<FunFactsProps> = ({ gamesStats, setGamesStats, gameResults }) => {
    const nav = useNavigate();

    const cardOne = (
        <React.Fragment>
          <CardContent className='cardContent'>
            <Typography variant="body1" component="div">
                Wins
            </Typography>
            <Typography variant="body1" component="div">
                {gamesStats.wins}
            </Typography>
          </CardContent>
          <CardContent className='cardContent'>
            <Typography variant="body1" component="div">
                Loses
            </Typography>
            <Typography variant="body1" component="div">
                {gamesStats.loses}
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
                {gamesStats.winsPercentage.toFixed(2)}
            </Typography>
          </CardContent>
          <CardContent className='cardContent'>
            <Typography variant="body1" component="div">
                Loses %
            </Typography>
            <Typography variant="body1" component="div">
                {gamesStats.losesPercentage.toFixed(2)}
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
                    {gamesStats.lastGameTotalScore}
                </Typography>
            </CardContent>
            <CardContent className='cardContent'>
                <Typography variant="body1" component="div">
                    Duration (minutes)
                </Typography>
                <Typography variant="body1" component="div">
                    {gamesStats.lastGameDuration.toFixed(2)}
                </Typography>
            </CardContent>
        </React.Fragment>
    );
    
    const cardThree = (
        <React.Fragment>
            <h2>Cool Games Stats</h2>
            <CardContent className='cardContent'>
                <Typography variant="body1" component="div">
                    Longest game (minutes)
                </Typography>
                <Typography variant="body1" component="div">
                    {gamesStats.longestGameDuration.toFixed(2)}
                </Typography>
            </CardContent>
            <CardContent className='cardContent'>
                <Typography variant="body1" component="div">
                    Shortest game (minutes)
                </Typography>
                <Typography variant="body1" component="div">
                    {gamesStats.shortestGameDuration.toFixed(2)}
                </Typography>
            </CardContent>
            <CardContent className='cardContent'>
                <Typography variant="body1" component="div">
                    Avg. Game Duration (minutes)
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

    const calculateWinsPercentage = () => (
        (gameResults.filter(x => x.gameResult === "W").length 
        / gameResults.length) * 100
    );

    const calculateLosesPercentage = () => (
        (gameResults.filter(x => x.gameResult === "L").length 
        / gameResults.length) * 100
    );

    const getLongestGameDuration = () => (
        Math.max(
            ...gameResults.map(r => r.duration)
        )
    );

    const getShortestGameDuration = () => (
        Math.min(
            ...gameResults.map(r => r.duration)
        )
    );

    const getStats = () => {
        if (gameResults.length > 0) {
            const winsTotal = gameResults.filter(game => game.gameResult === "W").length;
            const losesTotal = gameResults.filter(game => game.gameResult === "L").length;
            const winsPercentage = calculateWinsPercentage();
            const losesPercentage = calculateLosesPercentage();
            const longestGameDuration = getLongestGameDuration();
            const shortestGameDuration = getShortestGameDuration();
            const lastGameTotalScore = gameResults[gameResults.length - 1].totalScore;
            const lastGameDuration = gameResults[gameResults.length - 1].duration;

            setGamesStats({...gamesStats, 
                wins: winsTotal, 
                loses: losesTotal, 
                winsPercentage: winsPercentage, 
                losesPercentage: losesPercentage, 
                longestGameDuration: longestGameDuration, 
                shortestGameDuration: shortestGameDuration, 
                lastGameTotalScore: lastGameTotalScore,
                lastGameDuration: lastGameDuration
            });
        } else {
            setGamesStats(gamesStats);
        }
        
    }

    useEffect(() => {
        getStats();
    }, []);

    return (
        <> 
           <Button onClick={() => nav("/")}><img src={Logo} className="Small-logo" alt="logo" /></Button>
           <h1>Fun Facts</h1>
           <Box sx={{ minWidth: 350 }}>
                <Card className='card' variant="outlined">{cardOne}</Card>
                <Card className='card' variant="outlined">{cardTwo}</Card>
                <Card className='card' variant="outlined">{cardThree}</Card>
            </Box>
        </>
    );
};

export default FunFacts;
