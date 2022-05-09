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
import prettyMilliseconds from 'pretty-ms';

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
                {gamesStats.quits}
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
                    Wonder
                </Typography>
                <Typography variant="body1" component="div">
                    {gamesStats.lastGameWonder}
                </Typography>
            </CardContent>
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
                    Duration
                </Typography>
                <Typography variant="body1" component="div">
                    {gamesStats.lastGameDuration}
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
                    {gamesStats.longestGameDuration}
                </Typography>
            </CardContent>
            <CardContent className='cardContent'>
                <Typography variant="body1" component="div">
                    Shortest game (minutes)
                </Typography>
                <Typography variant="body1" component="div">
                    {gamesStats.shortestGameDuration}
                </Typography>
            </CardContent>
            <CardContent className='cardContent'>
                <Typography variant="body1" component="div">
                    Avg. Game Duration (minutes)
                </Typography>
                <Typography variant="body1" component="div">
                    {gamesStats.avgGameLength}
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

    const calculateWinsPercentage = () => {
        const winGamesTotal = gameResults.filter(x => x.gameResult === "W").length;
        const totalGamesExceptQuits = gameResults.filter(x => x.gameResult !== "Q").length; // Don't count quits in winning percentage
        const winningPercentage = (winGamesTotal / totalGamesExceptQuits) * 100;

        return winningPercentage;
    };

    const calculateLosesPercentage = () => {
        const loseGamesTotal = gameResults.filter(x => x.gameResult === "L").length;
        const totalGamesExceptQuits = gameResults.filter(x => x.gameResult !== "Q").length; // Don't count quits in losing percentage
        const losingPercentage = (loseGamesTotal / totalGamesExceptQuits) * 100;

        return losingPercentage;
    };

    const getLongestGameDuration = () => (
        Math.max(
            ...gameResults
            .filter(r => r.gameResult !== "Q") // Don't count quits in longest game duration
            .map(r => r.duration)
        )
    );

    const getShortestGameDuration = () => (
        Math.min(
            ...gameResults
            .filter(r => r.gameResult !== "Q") // Don't count quits in in shortest game duration
            .map(r => r.duration)
        )
    );

    const getAverageGameLength = () => {

        const gamesDuration = gameResults
            .filter(r => r.gameResult !== "Q") // Don't count quits in avg game lenth.
            .map(r => r.duration);
        
        return gamesDuration.reduce(
            (acc, r) => acc + r
            , 0
        ) / gamesDuration.length
    };

    const getStats = () => {
        const gameResultWLCheck = Object.entries(gameResults).filter((key, value) => key[1].gameResult === "W" || key[1].gameResult === "L");
        const gameResultQCheck = Object.entries(gameResults).filter((key, value) => key[1].gameResult === "Q");

        if (gameResults.length > 0 && gameResultWLCheck.length > 0) {
            const winsTotal = gameResults.filter(game => game.gameResult === "W").length;
            const losesTotal = gameResults.filter(game => game.gameResult === "L").length;
            const quitGamesTotal = gameResults.filter(game => game.gameResult === "Q").length;
            const winsPercentage = calculateWinsPercentage();
            const losesPercentage = calculateLosesPercentage();
            const longestGameDuration = prettyMilliseconds(getLongestGameDuration());
            const shortestGameDuration = prettyMilliseconds(getShortestGameDuration());
            const lastGameTotalScore = gameResults[gameResults.length - 1].totalScore;
            const lastGameDuration = prettyMilliseconds(gameResults[gameResults.length - 1].duration);
            const lastGameWonder = gameResults[gameResults.length - 1].wonder;;
            const avgGameLength = prettyMilliseconds(getAverageGameLength());

            setGamesStats({
                ...gamesStats, 
                wins: winsTotal, 
                loses: losesTotal,
                quits: quitGamesTotal,
                winsPercentage: winsPercentage, 
                losesPercentage: losesPercentage, 
                longestGameDuration: longestGameDuration, 
                shortestGameDuration: shortestGameDuration, 
                lastGameTotalScore: lastGameTotalScore,
                lastGameDuration: lastGameDuration,
                avgGameLength: avgGameLength,
                lastGameWonder: lastGameWonder
            });
        } else if (gameResults.length > 0 && gameResultQCheck.length > 0) {
            const quitGamesTotal = gameResults.filter(game => game.gameResult === "Q").length;
            setGamesStats({...gamesStats, quits: quitGamesTotal});
        } else {
            setGamesStats(gamesStats);
        }
        
    }

    useEffect(() => {
        getStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
