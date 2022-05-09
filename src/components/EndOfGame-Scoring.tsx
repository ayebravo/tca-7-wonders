import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from '../assets/Logo.png';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Typography from '@mui/material/Typography';
import { currentGame, gameResult } from '../App';
import '../styles/GameScoringPage.css';

type A = keyof gameScoresInput;
type gameScoresInput = {
    military: number,
    treasury: number,
    wonder: number,
    civilian: number,
    scientific: number,
    commercial: number,
    guild: number
};

interface NewGameProps {
    currentGame: currentGame,
    gameScores: number[],
    setGameScores:(score: any) => void,
    addGameResult: (result: gameResult) => void,
}

const inputToArray = (inputs: any):number[]  => {
    let outputArray: number[] = [];

    outputArray.push(inputs.military);
    outputArray.push(inputs.treasury);
    outputArray.push(inputs.wonder);
    outputArray.push(inputs.civilian);
    outputArray.push(inputs.scientific);
    outputArray.push(inputs.commercial);
    outputArray.push(inputs.guild);
    return outputArray;
}


const EndOfGameScoring: React.FC<NewGameProps> = ({ currentGame, gameScores, setGameScores, addGameResult }) => {
    const nav = useNavigate();

    // Popover section
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const openPopover = Boolean(anchorEl);
    const idPopover = openPopover ? 'simple-popover' : undefined;
    // End popover section

    const handleClick = (e: any) => {
        if (e && e.target && e.target.select) {
            e.target.select();
        };
    };

    const [invalidInput, setInvalidInput] = useState({
        military: false,
        treasury: false,
        wonder: false,
        civilian: false,
        scientific: false,
        commercial: false,
        guild: false
    });
    const [allScoresEntered, setAllScoresEntered] = useState(false);
    const [displayAlertMessage, setDisplayAlertMessage] = useState(false);
    const [runningTotalPoints, setRunningTotalPoints] = useState(0);

    const [gameScoresInput, setGameScoresInput] = useState<gameScoresInput>({
        military: 0,
        treasury: 0,
        wonder: 0,
        civilian: 0,
        scientific: 0,
        commercial: 0,
        guild: 0
    });

    useEffect(() => {
        let gameScoresArray = inputToArray(gameScoresInput);
        let runningTotalPoints = gameScoresArray.reduce(
            (acc, r) => acc + r
            , 0
        );

        setRunningTotalPoints(runningTotalPoints);
    }, [gameScoresInput]);

    // Validates user input and set game scores
    const setScores = (inputValue: string, scoreType: string) => {
        const regexExpression = new RegExp("^[0-9]+$");

        let militaryInput = gameScoresInput.military;
        let treasuryInput = gameScoresInput.treasury;
        let wonderInput = gameScoresInput.wonder;
        let civilianInput = gameScoresInput.civilian;
        let scientificInput = gameScoresInput.scientific;
        let commercialInput = gameScoresInput.commercial;
        let guildInput = gameScoresInput.guild;
        
        if (scoreType === "military") {
            if (!inputValue.match(regexExpression)) {
                setInvalidInput({...invalidInput, military: true});
                militaryInput = 0;
            } else {
                setInvalidInput({...invalidInput, military: false});
                militaryInput = parseInt(inputValue);
            }
            
        } else if (scoreType === "treasury") {
            if (!inputValue.match(regexExpression)) {
                setInvalidInput({...invalidInput, treasury: true});
                treasuryInput = 0;
            } else {
                setInvalidInput({...invalidInput, treasury: false});
                treasuryInput = parseInt(inputValue);
            }
        } else if (scoreType === "wonder") {
            if (!inputValue.match(regexExpression)) {
                setInvalidInput({...invalidInput, wonder: true});
                wonderInput = 0;
            } else {
                setInvalidInput({...invalidInput, wonder: false});
                wonderInput = parseInt(inputValue);
            }
        } else if (scoreType === "civilian") {
            if (!inputValue.match(regexExpression)) {
                setInvalidInput({...invalidInput, civilian: true});
                civilianInput = 0;
            } else {
                setInvalidInput({...invalidInput, civilian: false});
                civilianInput = parseInt(inputValue);
            }
        } else if (scoreType === "scientific") {
            if (!inputValue.match(regexExpression)) {
                setInvalidInput({...invalidInput, scientific: true});
                scientificInput = 0;
            } else {
                setInvalidInput({...invalidInput, scientific: false});
                scientificInput = parseInt(inputValue);
            }
        } else if (scoreType === "commercial") {
            if (!inputValue.match(regexExpression)) {
                setInvalidInput({...invalidInput, commercial: true});
                commercialInput = 0;
            } else {
                setInvalidInput({...invalidInput, commercial: false});
                commercialInput = parseInt(inputValue);
            }
        } else if (scoreType === "guild") {
            if (!inputValue.match(regexExpression)) {
                setInvalidInput({...invalidInput, guild: true});
                guildInput = 0;
            } else {
                setInvalidInput({...invalidInput, guild: false});
                guildInput = parseInt(inputValue);
            }
        }

        setGameScoresInput({
            military: militaryInput,
            treasury: treasuryInput,
            wonder: wonderInput,
            civilian: civilianInput,
            scientific: scientificInput,
            commercial: commercialInput,
            guild: guildInput
        });
    }

    const addGameScore = () => {
        let gameScoresArray = inputToArray(gameScoresInput);
        setGameScores([...gameScores, ...gameScoresArray]);
    };

    const validateEndingGame = (e: any) => { 
        const missingScores = Object.entries(invalidInput).filter(element => element[1] === true);
        
        if (missingScores.length === 0) {
            addGameScore();
            setAllScoresEntered(true);
            setDisplayAlertMessage(false);
        } else {
            setDisplayAlertMessage(true);
            handleClickPopover(e);
        }
    }

    const quitGame = () => {
        addGameResult({

            start: currentGame.startTime,
            end: new Date().toISOString(),
            duration: 0,
            gameResult: "Q",
            players: currentGame.players,
            wonder: currentGame.wonder,
            points: {
                military: gameScores[0],
                treasury: gameScores[1],
                wonder: gameScores[2],
                civilian: gameScores[3],
                scientific: gameScores[4],
                commercial: gameScores[5],
                guild: gameScores[6]
            },
            totalScore: 0
        });
        nav(-2);
    }

    const adjustInput = (category: A, adjustmentValue: number) => {
        let copy = {...gameScoresInput};

        if (copy[category] === 0 && adjustmentValue < 0) {
            return;
        }

        copy[category] += adjustmentValue;
        setGameScoresInput(copy);
    };

    useEffect(() => {
        if (displayAlertMessage === false && allScoresEntered === true) {
            nav("/game-result");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayAlertMessage, allScoresEntered])

    // TODO: Add more info or help at the top (or a ? icon) with instructions (as dialog or new screen)

    return (
        <div className="endOfGameContainer"> 
           <Button onClick={() => nav("/")}><img src={Logo} className="Small-logo" alt="logo" /></Button>
           <h1 style={{textAlign: "left", marginBottom: 0}}>Game Points</h1>
           <p>Add the points at the end of Stage 3.</p>
           
           <div className='endOfGameScoringSection'>
                <Typography style={{paddingBottom: "1em", fontWeight: 600}} variant="button" display="block" gutterBottom>
                    Running Total: {runningTotalPoints}
                </Typography>
                <div className='militaryPointsContainer'>
                    <div style={{display: "flex", alignItems: "flex-end", paddingBottom: "0.5em", maxWidth: "15em"}}>
                        <button 
                            onClick={
                                () => adjustInput("military", -1)
                            } 
                            className='minusButton'><RemoveIcon /></button>
                        <TextField
                            autoFocus
                            error={invalidInput["military"]}
                            onClick={handleClick}
                            autoComplete='off'
                            margin="dense"
                            id="militaryPoints"
                            label="Add Military Points"
                            value={gameScoresInput["military"]}
                            InputProps={{
                                inputProps: { 
                                    min: 0 
                                }
                            }}
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setScores(e.target.value, "military")}
                        />
                        <button 
                            onClick={
                                () => adjustInput("military", 1)
                            } 
                            className='plusButton'><AddIcon /></button>
                    </div>
                    {   
                        invalidInput["military"] === true ?
                            <small style={{maxWidth: "80%", paddingLeft: "2em", color: "#d32f2f"}}>Format: Only numeric values 0-9 and at least one character</small>
                        : <></>
                    }
                </div>
                
                <div className='treasuryPointsContainer'>
                <div style={{display: "flex", alignItems: "flex-end", paddingBottom: "0.5em", maxWidth: "15em"}}>
                    <button
                        onClick={
                            () => adjustInput("treasury", -1)
                        } 
                        className='minusButton'><RemoveIcon /></button>
                        <TextField
                            onClick={handleClick}
                            error={invalidInput["treasury"]}
                            autoComplete='off'
                            margin="dense"
                            value={gameScoresInput["treasury"]}
                            InputProps={{
                                inputProps: { 
                                    min: 0 
                                }
                            }}
                            id="treasuryPoints"
                            label="Add Treasury Points"
                            type="number"
                            variant="standard"
                            onChange={(e) => setScores(e.target.value, "treasury")}
                        />
                        <button 
                            onClick={
                                () => adjustInput("treasury", 1)
                            } 
                            className='plusButton'><AddIcon /></button>
                    </div>
                    {
                        invalidInput["treasury"] === true ?
                            <small style={{maxWidth: "80%", paddingLeft: "2em", color: "#d32f2f"}}>Format: Only numeric values 0-9 and at least one character</small>
                        : <></>
                    }
                </div>

                <div className='wondersPointsContainer'>
                <div style={{display: "flex", alignItems: "flex-end", paddingBottom: "0.5em", maxWidth: "15em"}}>
                    <button 
                        onClick={
                            () => adjustInput("wonder", -1)
                        } 
                        className='minusButton'><RemoveIcon /></button>
                        <TextField
                            onClick={handleClick}
                            error={invalidInput["wonder"]}
                            value={gameScoresInput["wonder"]}
                            InputProps={{
                                inputProps: { 
                                    min: 0 
                                }
                            }}
                            autoComplete='off'
                            margin="dense"
                            id="wonderPoints"
                            label="Add Wonder Points"
                            type="number"
                            variant="standard"
                            onChange={(e) => setScores(e.target.value, "wonder")}
                        />
                        <button 
                            onClick={
                                () => adjustInput("wonder", 1)
                            } 
                            className='plusButton'><AddIcon /></button>
                    </div>
                    {
                        invalidInput["wonder"] === true ?
                            <small style={{maxWidth: "80%", paddingLeft: "2em", color: "#d32f2f"}}>Format: Only numeric values 0-9 and at least one character</small>
                        : <></>
                    }
                </div>

                <div className='civilianStructuresPointsContainer'>
                    <div style={{display: "flex", alignItems: "flex-end", paddingBottom: "0.5em", maxWidth: "15em"}}>
                        <button
                            onClick={
                                () => adjustInput("civilian", -1)
                            } 
                            className='minusButton'><RemoveIcon /></button>
                        <TextField
                            onClick={handleClick}
                            error={invalidInput["civilian"]}
                            autoComplete='off'
                            margin="dense"
                            id="civilianStructuresPoints"
                            value={gameScoresInput["civilian"]}
                            InputProps={{
                                inputProps: { 
                                    min: 0 
                                }
                            }}
                            label="Add Civilian Points"
                            type="number"
                            variant="standard"
                            onChange={(e) => setScores(e.target.value, "civilian")}
                        />
                        <button 
                            onClick={
                                () => adjustInput("civilian", 1)
                            } 
                            className='plusButton'><AddIcon /></button>
                    </div>
                    {
                        invalidInput["civilian"] === true ?
                            <small style={{maxWidth: "80%", paddingLeft: "2em", color: "#d32f2f"}}>Format: Only numeric values 0-9 and at least one character</small>
                        : <></>
                    }
                </div>

                <div className='scientificPointsContainer'>
                    <div style={{display: "flex", alignItems: "flex-end", paddingBottom: "0.5em", maxWidth: "15em"}}>
                        <button 
                            onClick={
                                () => adjustInput("scientific", -1)
                            } 
                            className='minusButton'><RemoveIcon /></button>
                            <TextField
                                onClick={handleClick}
                                error={invalidInput["scientific"]}
                                value={gameScoresInput["scientific"]}
                                InputProps={{
                                    inputProps: { 
                                        min: 0 
                                    }
                                }}
                                autoComplete='off'
                                margin="dense"
                                id="scientificPoints"
                                label="Add Scientific Points"
                                type="number"
                                variant="standard"
                                onChange={(e) => setScores(e.target.value, "scientific")}
                                />
                            <button 
                                onClick={
                                    () => adjustInput("scientific", 1)
                                } 
                                className='plusButton'><AddIcon /></button>
                    </div>
                    {
                        invalidInput["scientific"] === true ?
                            <small style={{maxWidth: "80%", paddingLeft: "2em", color: "#d32f2f"}}>Format: Only numeric values 0-9 and at least one character</small>
                        : <></>
                    }
                </div>

                <div className='commercialPointsContainer'>
                    <div style={{display: "flex", alignItems: "flex-end", paddingBottom: "0.5em", maxWidth: "15em"}}>
                        <button 
                            onClick={
                                () => adjustInput("commercial", -1)
                            } 
                            className='minusButton'><RemoveIcon /></button>
                        <TextField
                            onClick={handleClick}
                            error={invalidInput["commercial"]}
                            value={gameScoresInput["commercial"]}
                            InputProps={{
                                inputProps: { 
                                    min: 0 
                                }
                            }}
                            autoComplete='off'
                            margin="dense"
                            id="commercialPoints"
                            label="Add Commercial Points"
                            type="number"
                            variant="standard"
                            onChange={(e) => setScores(e.target.value, "commercial")}
                        />
                        <button 
                            onClick={
                                () => adjustInput("commercial", 1)
                            } 
                            className='plusButton'><AddIcon /></button>
                    </div>
                    {
                        invalidInput["commercial"] === true ?
                            <small style={{maxWidth: "80%", paddingLeft: "2em", color: "#d32f2f"}}>Format: Only numeric values 0-9 and at least one character</small>
                        : <></>
                    }
                </div>

                <div className='guildPointsContainer'>
                    <div style={{display: "flex", alignItems: "flex-end", paddingBottom: "0.5em", maxWidth: "15em"}}>
                        <button 
                            onClick={
                                () => adjustInput("guild", -1)
                            } 
                            className='minusButton'><RemoveIcon /></button>
                        <TextField
                            onClick={handleClick}
                            error={invalidInput["guild"]}
                            value={gameScoresInput["guild"]}
                            InputProps={{
                                inputProps: { 
                                    min: 0 
                                }
                            }}
                            autoComplete='off'
                            margin="dense"
                            id="guildPoints"
                            label="Add Guild Points"
                            type="number"
                            variant="standard"
                            onChange={(e) => setScores(e.target.value, "guild")}
                        />
                        <button
                            onClick={
                                () => adjustInput("guild", 1)
                            } 
                            className='plusButton'><AddIcon /></button>
                    </div>
                    {
                        invalidInput["guild"] === true ?
                            <small style={{maxWidth: "80%", paddingLeft: "2em", color: "#d32f2f"}}>Format: Only numeric values 0-9 and at least one character</small>
                        : <></>
                    }
                </div>

            </div>

            <Button sx={{ marginRight: "0.5em" }} variant="outlined" size="large" color="success" onClick={quitGame}
            >Quit Game</Button>
           <Button sx={{ marginRight: "2em" }} variant="contained" size="large" color="success" onClick={ (e) => {
               validateEndingGame(e);
            }}
            >End Game</Button>
            { 
                anchorEl !== null ?
                    <Popover
                        id={idPopover}
                        open={openPopover}
                        anchorEl={anchorEl}
                        onClose={handleClosePopover}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                >
                    <Typography sx={{ p: 2 }}>Please add points for all the categories</Typography>
                </Popover>
                : <></>
           }
        </div>
    );
};

export default EndOfGameScoring;