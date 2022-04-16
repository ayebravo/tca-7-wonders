import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from '../assets/Logo.png';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { currentGame, gameResult } from '../App';
import '../styles/GameScoringPage.css';

interface NewGameProps {
    currentGame: currentGame,
    gameScores: number[],
    setGameScores:(score: any) => void,
    addGameResult: (result: gameResult) => void,
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

    const [invalidInput, setInvalidInput] = useState({
        military: true,
        treasury: true,
        wonder: true,
        civilian: true,
        scientific: true,
        commercial: true,
        guild: true
    });
    const [allScoresEntered, setAllScoresEntered] = useState(false);
    const [displayAlertMessage, setDisplayAlertMessage] = useState(false);
    const [isInputEntered, setIsInputEntered] = useState({
        military: false,
        treasury: false,
        wonder: false,
        civilian: false,
        scientific: false,
        commercial: false,
        guild: false
    });

    const [gameScoresInput, setGameScoresInput] = useState({
        military: 0,
        treasury: 0,
        wonder: 0,
        civilian: 0,
        scientific: 0,
        commercial: 0,
        guild: 0
    });

    const [openMilitaryPointsModal, setOpenMilitaryPointsModal] = useState(false);
    const [openTreasuryPointsModal, setOpenTreasuryPointsModal] = useState(false);
    const [openWondersPointsModal, setOpenWondersPointsModal] = useState(false);
    const [openCivilianStructuresModal, setOpenCivilianStructuresModal] = useState(false);
    const [openScientificPointsModal, setOpenScientificPointsModal] = useState(false);
    const [openCommercialPointsModal, setOpenCommercialPointsModal] = useState(false);
    const [openGuildPointsModal, setOpenGuildPointsModal] = useState(false);

    const gameScoresArray: number[] = [];

    const handleClickOpenModal = (modalID: string) => {
        if (modalID === "militaryPoints") {
            setOpenMilitaryPointsModal(true)
        } else if (modalID === "treasuryPoints") {
            setOpenTreasuryPointsModal(true)
        } else if (modalID === "wonderPoints") {
            setOpenWondersPointsModal(true)
        } else if (modalID === "civilianStructuresPoints") {
            setOpenCivilianStructuresModal(true)
        } else if (modalID === "scientificPoints") {
            setOpenScientificPointsModal(true)
        } else if (modalID === "commercialPoints") {
            setOpenCommercialPointsModal(true)
        } else if (modalID === "guildPoints") {
            setOpenGuildPointsModal(true)
        }
    };
  
    const handleCloseModal = (modalID: string) => {
        if (modalID === "militaryPoints") {
            setOpenMilitaryPointsModal(false)
        } else if (modalID === "treasuryPoints") {
            setOpenTreasuryPointsModal(false)
        } else if (modalID === "wonderPoints") {
            setOpenWondersPointsModal(false)
        } else if (modalID === "civilianStructuresPoints") {
            setOpenCivilianStructuresModal(false)
        } else if (modalID === "scientificPoints") {
            setOpenScientificPointsModal(false)
        } else if (modalID === "commercialPoints") {
            setOpenCommercialPointsModal(false)
        } else if (modalID === "guildPoints") {
            setOpenGuildPointsModal(false)
        }

    };

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
            if (inputValue.match(regexExpression)) {
                setInvalidInput({...invalidInput, military: false});
                militaryInput = parseInt(inputValue);
            } else {
                setInvalidInput({...invalidInput, military: true});
            }
            
        } else if (scoreType === "treasury") {
            if (inputValue.match(regexExpression)) {
                setInvalidInput({...invalidInput, treasury: false});
                treasuryInput = parseInt(inputValue);
            } else {
                setInvalidInput({...invalidInput, treasury: true});
            }
        } else if (scoreType === "wonder") {
            if (inputValue.match(regexExpression)) {
                setInvalidInput({...invalidInput, wonder: false});
                wonderInput = parseInt(inputValue);
            } else {
                setInvalidInput({...invalidInput, wonder: true});
            }
        } else if (scoreType === "civilian") {
            if (inputValue.match(regexExpression)) {
                setInvalidInput({...invalidInput, civilian: false});
                civilianInput = parseInt(inputValue);
            } else {
                setInvalidInput({...invalidInput, civilian: true});
            }
        } else if (scoreType === "scientific") {
            if (inputValue.match(regexExpression)) {
                setInvalidInput({...invalidInput, scientific: false});
                scientificInput = parseInt(inputValue);
            } else {
                setInvalidInput({...invalidInput, scientific: true});
            }
        } else if (scoreType === "commercial") {
            if (inputValue.match(regexExpression)) {
                setInvalidInput({...invalidInput, commercial: false});
                commercialInput = parseInt(inputValue);
            } else {
                setInvalidInput({...invalidInput, commercial: true});
            }
        } else if (scoreType === "guild") {
            if (inputValue.match(regexExpression)) {
                setInvalidInput({...invalidInput, guild: false});
                guildInput = parseInt(inputValue);
            } else {
                setInvalidInput({...invalidInput, guild: true});
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
        })
    }

    const handleInputCheckbox = (scoreType: string) => {
        setIsInputEntered({
            military: scoreType === "militaryPoints" ? !isInputEntered["military"] : isInputEntered["military"],
            treasury: scoreType === "treasuryPoints" ? !isInputEntered["treasury"] : isInputEntered["treasury"],
            wonder: scoreType === "wonderPoints" ? !isInputEntered["wonder"] : isInputEntered["wonder"],
            civilian: scoreType === "civilianStructuresPoints" ? !isInputEntered["civilian"] : isInputEntered["civilian"],
            scientific: scoreType === "scientificPoints" ? !isInputEntered["scientific"] : isInputEntered["scientific"],
            commercial: scoreType === "commercialPoints" ? !isInputEntered["commercial"] : isInputEntered["commercial"],
            guild: scoreType === "guildPoints" ? !isInputEntered["guild"] : isInputEntered["guild"]
        });
    }

    const addGameScore = (scoreType: string) => {

        if (scoreType === "militaryPoints") {
            if (invalidInput["military"] === false) {
                gameScoresArray.push(gameScoresInput.military);
                handleCloseModal("militaryPoints");
            } else {
                handleCloseModal("militaryPoints");
            }
            
        } else if (scoreType === "treasuryPoints") {
            if (invalidInput["treasury"] === false) {
                gameScoresArray.push(gameScoresInput.treasury);
                handleCloseModal("treasuryPoints");
            } else {
                handleCloseModal("treasuryPoints");
            }

        } else if (scoreType === "wonderPoints") {
            if (invalidInput["wonder"] === false) {
                gameScoresArray.push(gameScoresInput.wonder);
                handleCloseModal("wonderPoints");
            } else {
                handleCloseModal("wonderPoints");
            }

        } else if (scoreType === "civilianStructuresPoints") {
            if (invalidInput["civilian"] === false) {
                gameScoresArray.push(gameScoresInput.civilian);
                handleCloseModal("civilianStructuresPoints");
            } else {
                handleCloseModal("civilianStructuresPoints");
            }

        } else if (scoreType === "scientificPoints") {
            if (invalidInput["scientific"] === false) {
                gameScoresArray.push(gameScoresInput.scientific);
                handleCloseModal("scientificPoints");
            } else {
                handleCloseModal("scientificPoints");
            }

        } else if (scoreType === "commercialPoints") {
            if (invalidInput["commercial"] === false) {
                gameScoresArray.push(gameScoresInput.commercial);
                handleCloseModal("commercialPoints");
            } else {
                handleCloseModal("commercialPoints");
            }

        } else if (scoreType === "guildPoints") {
            if (invalidInput["commercial"] === false) {
                gameScoresArray.push(gameScoresInput.guild);
                handleCloseModal("guildPoints");
            } else {
                handleCloseModal("guildPoints");
            }
        }

        setGameScores([...gameScores, ...gameScoresArray]);
        handleInputCheckbox(scoreType);
    };

    const validateEndingGame = (e: any) => {
        const scoresEnteredCheck = Object.entries(isInputEntered).filter((key, value) => key[1] === false);
        if (scoresEnteredCheck.length === 0) {
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

    useEffect(() => {
        if (displayAlertMessage === false && allScoresEntered === true) {
            nav("/game-result");
        };
    }, [displayAlertMessage, allScoresEntered])

    // TODO: Add Civilian Structures, scientific, commercial, and guild points instructions in the DialogContentText

    return (
        <div className="endOfGameContainer"> 
           <Button onClick={() => nav("/")}><img src={Logo} className="Small-logo" alt="logo" /></Button>
           <h1 style={{textAlign: "left", marginBottom: 0}}>Game Points</h1>
           <p>Add the points at the end of Stage 3.</p>
           <div className='endOfGameScoringSection'>
                <div className='militaryPointsContainer'>
                    <Button variant="contained" onClick={() => handleClickOpenModal("militaryPoints")}>
                        Add military points
                    </Button>
                    <Dialog open={openMilitaryPointsModal} onClose={() => handleCloseModal("militaryPoints")}>
                        <DialogTitle className='dialogHeading'>Military Points</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Add the total of military points after counting your positive and negative tokens.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                error={invalidInput["military"]}
                                helperText="Format: Only numeric values 0-9 and at least one character"
                                autoComplete='off'
                                margin="dense"
                                id="militaryPoints"
                                label="Points"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setScores(e.target.value, "military")}
                            />
                            </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleCloseModal("militaryPoints")}>Cancel</Button>
                            <Button onClick={() => { if(invalidInput["military"] === false) addGameScore("militaryPoints")}}>Add points</Button>
                        </DialogActions>
                    </Dialog>
                    <Checkbox
                        checked={isInputEntered["military"]}
                        color="success"
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>
                
                <div className='treasuryPointsContainer'>
                    <Button variant="contained" onClick={() => handleClickOpenModal("treasuryPoints")}>
                        Add treasury points
                    </Button>
                    <Dialog open={openTreasuryPointsModal} onClose={() => handleCloseModal("treasuryPoints")}>
                        <DialogTitle className='dialogHeading'>Treasury Points</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                For every 3 coins in your possession at the end of the game, you score 1 victory point. Leftover coins score no points. <br /> Count all your coins and add here the total of <b>Treasury Points</b>.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                error={invalidInput["treasury"]}
                                helperText="Format: Only numeric values 0-9 and at least one character"
                                autoComplete='off'
                                margin="dense"
                                id="treasuryPoints"
                                label="Points"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setScores(e.target.value, "treasury")}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleCloseModal("treasuryPoints")}>Cancel</Button>
                            <Button onClick={() => { if(invalidInput["treasury"] === false) addGameScore("treasuryPoints")}}>Add points</Button>
                        </DialogActions>
                    </Dialog>
                    <Checkbox
                        checked={isInputEntered["treasury"]}
                        color="success"
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>

                <div className='wondersPointsContainer'>
                    <Button variant="contained" onClick={() => handleClickOpenModal("wonderPoints")}>
                        Add wonder points
                    </Button>
                    <Dialog open={openWondersPointsModal} onClose={() => handleCloseModal("wonderPoints")}>
                        <DialogTitle className='dialogHeading'>Stage 3 - Wonder Points</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Add the total of victory points from all built stages in your wonder.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                error={invalidInput["wonder"]}
                                helperText="Format: Only numeric values 0-9 and at least one character"
                                autoComplete='off'
                                margin="dense"
                                id="wonderPoints"
                                label="Points"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setScores(e.target.value, "wonder")}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleCloseModal("wonderPoints")}>Cancel</Button>
                            <Button onClick={() => { if(invalidInput["wonder"] === false) addGameScore("wonderPoints")}}>Add points</Button>
                        </DialogActions>
                    </Dialog>
                    <Checkbox
                        checked={isInputEntered["wonder"]}
                        color="success"
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>

                <div className='civilianStructuresPointsContainer'>
                    <Button variant="contained" onClick={() => handleClickOpenModal("civilianStructuresPoints")}>
                        Add civilian points
                    </Button>
                    <Dialog open={openCivilianStructuresModal} onClose={() => handleCloseModal("civilianStructuresPoints")}>
                        <DialogTitle className='dialogHeading'>Civilian Structures Points</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To be written...
                            </DialogContentText>
                            <TextField
                                autoFocus
                                error={invalidInput["civilian"]}
                                helperText="Format: Only numeric values 0-9 and at least one character"
                                autoComplete='off'
                                margin="dense"
                                id="civilianStructuresPoints"
                                label="Points"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setScores(e.target.value, "civilian")}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleCloseModal("civilianStructuresPoints")}>Cancel</Button>
                            <Button onClick={() => { if(invalidInput["civilian"] === false) addGameScore("civilianStructuresPoints")}}>Add points</Button>
                        </DialogActions>
                    </Dialog>
                    <Checkbox
                        checked={isInputEntered["civilian"]}
                        color="success"
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>

                <div className='scientificPointsContainer'>
                    <Button variant="contained" onClick={() => handleClickOpenModal("scientificPoints")}>
                        Add scientific points
                    </Button>
                    <Dialog open={openScientificPointsModal} onClose={() => handleCloseModal("scientificPoints")}>
                        <DialogTitle className='dialogHeading'>Scientific Points</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To be written...
                            </DialogContentText>
                            <TextField
                                autoFocus
                                error={invalidInput["scientific"]}
                                helperText="Format: Only numeric values 0-9 and at least one character"
                                autoComplete='off'
                                margin="dense"
                                id="scientificPoints"
                                label="Points"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setScores(e.target.value, "scientific")}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleCloseModal("scientificPoints")}>Cancel</Button>
                            <Button onClick={() => { if(invalidInput["scientific"] === false) addGameScore("scientificPoints")}}>Add points</Button>
                        </DialogActions>
                    </Dialog>
                    <Checkbox
                        checked={isInputEntered["scientific"]}
                        color="success"
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>

                <div className='commercialPointsContainer'>
                    <Button variant="contained" onClick={() => handleClickOpenModal("commercialPoints")}>
                        Add commercial points
                    </Button>
                    <Dialog open={openCommercialPointsModal} onClose={() => handleCloseModal("commercialPoints")}>
                        <DialogTitle className='dialogHeading'>Commercial Points</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To be written...
                            </DialogContentText>
                            <TextField
                                autoFocus
                                error={invalidInput["commercial"]}
                                helperText="Format: Only numeric values 0-9 and at least one character"
                                autoComplete='off'
                                margin="dense"
                                id="commercialPoints"
                                label="Points"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setScores(e.target.value, "commercial")}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleCloseModal("commercialPoints")}>Cancel</Button>
                            <Button onClick={() => { if(invalidInput["commercial"] === false) addGameScore("commercialPoints")}}>Add points</Button>
                        </DialogActions>
                    </Dialog>
                    <Checkbox
                        checked={isInputEntered["commercial"]}
                        color="success"
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>

                <div className='guildPointsContainer'>
                    <Button variant="contained" onClick={() => handleClickOpenModal("guildPoints")}>
                        Add guild points
                    </Button>
                    <Dialog open={openGuildPointsModal} onClose={() => handleCloseModal("guildPoints")}>
                        <DialogTitle className='dialogHeading'>Guild Points</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To be written...
                            </DialogContentText>
                            <TextField
                                autoFocus
                                error={invalidInput["guild"]}
                                helperText="Format: Only numeric values 0-9 and at least one character"
                                autoComplete='off'
                                margin="dense"
                                id="guildPoints"
                                label="Points"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setScores(e.target.value, "guild")}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleCloseModal("guildPoints")}>Cancel</Button>
                            <Button onClick={() => { if(invalidInput["guild"] === false) addGameScore("guildPoints")}}>Add points</Button>
                        </DialogActions>
                    </Dialog>
                    <Checkbox
                        checked={isInputEntered["guild"]}
                        color="success"
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
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