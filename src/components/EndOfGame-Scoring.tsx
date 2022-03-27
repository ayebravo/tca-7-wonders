import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../assets/Logo.png';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import { currentGame, gameResult } from '../App';
import '../styles/GameScoringPage.css';

interface NewGameProps {
    addGameResult: (result: gameResult) => void;
    currentGame: currentGame
}

const EndOfGameScoring: React.FC<NewGameProps> = ({addGameResult, currentGame}) => {
    const nav = useNavigate();

    const [gameScoresInput, setGameScoresInput] = useState({
        military: 0,
        treasury: 0,
        wonder: 0,
        civilian: 0,
        scientific: 0,
        commercial: 0,
        guild: 0
    });
    const [gameScores, setGameScores] = useState<number[]>([]);
    const [openMilitaryPointsModal, setOpenMilitaryPointsModal] = useState(false);
    const [openTreasuryPointsModal, setOpenTreasuryPointsModal] = useState(false);
    const [openWondersPointsModal, setOpenWondersPointsModal] = useState(false);
    const [openCivilianStructuresModal, setOpenCivilianStructuresModal] = useState(false);
    const [openScientificPointsModal, setOpenScientificPointsModal] = useState(false);
    const [openCommercialPointsModal, setOpenCommercialPointsModal] = useState(false);
    const [openGuildPointsModal, setOpenGuildPointsModal] = useState(false);
    // TODO: Try to have one useState that is an object:
    // const [open, setOpen] = useState({
    //     openMilitaryPointsModal: false,
    //     openTreasuryPointsModal: false
    // })
    const gameScoresArray: number[] = [];
    
    const handleClickOpen = (modalID: string) => {
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
  
    const handleClose = (modalID: string) => {
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

    // TODO: Add some way of checking if the user already entered a specific score and/or a progress bar to give feedback to the user
    const setScores = (inputValue: string, scoreType: string) => {
        const militaryInput = scoreType === "military" ? parseInt(inputValue) : gameScoresInput.military;
        const treasuryInput = scoreType === "treasury" ? parseInt(inputValue) : gameScoresInput.treasury;
        const wonderInput = scoreType === "wonder" ? parseInt(inputValue) : gameScoresInput.wonder;
        const civilianInput = scoreType === "civilian" ? parseInt(inputValue) : gameScoresInput.civilian;
        const scientificInput = scoreType === "scientific" ? parseInt(inputValue) : gameScoresInput.scientific;
        const commercialInput = scoreType === "commercial" ? parseInt(inputValue) : gameScoresInput.commercial;
        const guildInput = scoreType === "guild" ? parseInt(inputValue) : gameScoresInput.guild;

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

    const addGameScore = (scoreType: string) => {
        if (scoreType === "militaryPoints") {
            gameScoresArray.push(gameScoresInput.military);
            handleClose("militaryPoints");
        } else if (scoreType === "treasuryPoints") {
            gameScoresArray.push(gameScoresInput.treasury);
            handleClose("treasuryPoints");
        } else if (scoreType === "wonderPoints") {
            gameScoresArray.push(gameScoresInput.wonder);
            handleClose("wonderPoints");
        } else if (scoreType === "civilianStructuresPoints") {
            gameScoresArray.push(gameScoresInput.civilian);
            handleClose("civilianStructuresPoints");
        } else if (scoreType === "scientificPoints") {
            gameScoresArray.push(gameScoresInput.scientific);
            handleClose("scientificPoints");
        } else if (scoreType === "commercialPoints") {
            gameScoresArray.push(gameScoresInput.commercial);
            handleClose("commercialPoints");
        } else if (scoreType === "guildPoints") {
            gameScoresArray.push(gameScoresInput.guild);
            handleClose("guildPoints");
        }

        setGameScores([...gameScores, ...gameScoresArray]);
    };

    const endGame = () => {
        // Add the new game result to the app data
        addGameResult({
            // TODO: Work on winner property so they are not hard-coded
            start: currentGame.startTime,
            end: new Date().toISOString(),
            winner: "Me",
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
            }
        });

        // Navigate to the Home page
        nav("/");
    }

    // TODO: Add Civilian Structures, scientific, commercial, and guild points instructions in the DialogContentText

    return (
        <> 
           <Button onClick={() => nav("/")}><img src={Logo} className="Small-logo" alt="logo" /></Button>
           <h1>Game Scores</h1>
           <div className='endOfGameScoringSection'>
                <div className='militaryPointsContainer'>
                    <Button variant="contained" onClick={() => handleClickOpen("militaryPoints")}>
                        Add military points
                    </Button>
                    <Dialog open={openMilitaryPointsModal} onClose={() => handleClose("militaryPoints")}>
                        <DialogTitle className='dialogHeading'>Military Points</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Add the total of military points after counting your positive and negative tokens.
                            </DialogContentText>
                            <TextField
                                autoFocus
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
                            <Button onClick={() => handleClose("militaryPoints")}>Cancel</Button>
                            <Button onClick={() => addGameScore("militaryPoints")}>Add points</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className='treasuryPointsContainer'>
                    <Button variant="contained" onClick={() => handleClickOpen("treasuryPoints")}>
                        Add treasury points
                    </Button>
                    <Dialog open={openTreasuryPointsModal} onClose={() => handleClose("treasuryPoints")}>
                        <DialogTitle className='dialogHeading'>Treasury Points</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                For every 3 coins in your possession at the end of the game, you score 1 victory point. Leftover coins score no points. <br /> Count all your coins and add here the total of <b>Treasury Points</b>.
                            </DialogContentText>
                            <TextField
                                autoFocus
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
                            <Button onClick={() => handleClose("treasuryPoints")}>Cancel</Button>
                            <Button onClick={() => addGameScore("treasuryPoints")}>Add points</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className='wondersPointsContainer'>
                    <Button variant="contained" onClick={() => handleClickOpen("wonderPoints")}>
                        Add wonder points
                    </Button>
                    <Dialog open={openWondersPointsModal} onClose={() => handleClose("wonderPoints")}>
                        <DialogTitle className='dialogHeading'>Stage 3 - Wonder Points</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Add the total of victory points from all built stages in your wonder.
                            </DialogContentText>
                            <TextField
                                autoFocus
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
                            <Button onClick={() => handleClose("wonderPoints")}>Cancel</Button>
                            <Button onClick={() => addGameScore("wonderPoints")}>Add points</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className='civilianStructuresPointsContainer'>
                    <Button variant="contained" onClick={() => handleClickOpen("civilianStructuresPoints")}>
                        Add civilian points
                    </Button>
                    <Dialog open={openCivilianStructuresModal} onClose={() => handleClose("civilianStructuresPoints")}>
                        <DialogTitle className='dialogHeading'>Civilian Structures Points</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To be written...
                            </DialogContentText>
                            <TextField
                                autoFocus
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
                            <Button onClick={() => handleClose("civilianStructuresPoints")}>Cancel</Button>
                            <Button onClick={() => addGameScore("civilianStructuresPoints")}>Add points</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className='scientificPointsContainer'>
                    <Button variant="contained" onClick={() => handleClickOpen("scientificPoints")}>
                        Add scientific points
                    </Button>
                    <Dialog open={openScientificPointsModal} onClose={() => handleClose("scientificPoints")}>
                        <DialogTitle className='dialogHeading'>Scientific Points</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To be written...
                            </DialogContentText>
                            <TextField
                                autoFocus
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
                            <Button onClick={() => handleClose("scientificPoints")}>Cancel</Button>
                            <Button onClick={() => addGameScore("scientificPoints")}>Add points</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className='commercialPointsContainer'>
                    <Button variant="contained" onClick={() => handleClickOpen("commercialPoints")}>
                        Add commercial points
                    </Button>
                    <Dialog open={openCommercialPointsModal} onClose={() => handleClose("commercialPoints")}>
                        <DialogTitle className='dialogHeading'>Commercial Points</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To be written...
                            </DialogContentText>
                            <TextField
                                autoFocus
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
                            <Button onClick={() => handleClose("commercialPoints")}>Cancel</Button>
                            <Button onClick={() => addGameScore("commercialPoints")}>Add points</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className='guildPointsContainer'>
                    <Button variant="contained" onClick={() => handleClickOpen("guildPoints")}>
                        Add guild points
                    </Button>
                    <Dialog open={openGuildPointsModal} onClose={() => handleClose("guildPoints")}>
                        <DialogTitle className='dialogHeading'>Guild Points</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To be written...
                            </DialogContentText>
                            <TextField
                                autoFocus
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
                            <Button onClick={() => handleClose("guildPoints")}>Cancel</Button>
                            <Button onClick={() => addGameScore("guildPoints")}>Add points</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
           <Button variant="contained" size="large" color="success" onClick={ endGame }>End Game</Button>
        </>
    );
};

export default EndOfGameScoring;