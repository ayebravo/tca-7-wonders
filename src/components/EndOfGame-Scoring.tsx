import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { format, compareAsc } from 'date-fns'; // package used to format dates
import Logo from '../assets/Logo.png';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import { gameResult } from '../App';
import '../styles/GameScoringPage.css';

interface NewGameProps {
    addGameResult: (result: gameResult) => void;
}

const EndOfGameScoring: React.FC<NewGameProps> = ({addGameResult}) => {
    const nav = useNavigate();
    const [openMilitaryPointsModal, setOpenMilitaryPointsModal] = useState(false);
    const [openTreasuryPointsModal, setOpenTreasuryPointsModal] = useState(false);
    const [openWondersPointsModal, setOpenWondersPointsModal] = useState(false);
    const [openCivilianStructuresModal, setOpenCivilianStructuresModal] = useState(false);
    const [openScientificPointsModal, setOpenScientificPointsModal] = useState(false);
    const [openCommercialPointsModal, setOpenCommercialPointsModal] = useState(false);
    const [openGuildPointsModal, setOpenGuildPointsModal] = useState(false);
    
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

    const endGame = () => {
        // Add the new game result to the app data
        addGameResult({
            // TODO: formattedDate will likely be replaced by the properties:
            // start: currentGame.start,
            // end: new Date().toISOString()
            formattedDate: "2022-12-21", 
            winner: "Me",
            players: [{name: "Me", uniqueID: "1"}, {name: "Sam", uniqueID: "2"}, {name: "Mike", uniqueID: "3"}]
        });

        // Navigate to the Home page
        nav("/");
    }

    // TODO: Add Civilian Structures, scientific, commercial, and guild points instructions in the DialogContentText
    // TODO: The Add points button should add points to an array for example, and then close the dialog modal (create new function or edit the handleClose one?)

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
                            />
                            </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleClose("militaryPoints")}>Cancel</Button>
                            <Button onClick={() => handleClose("militaryPoints")}>Add points</Button>
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
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleClose("treasuryPoints")}>Cancel</Button>
                            <Button onClick={() => handleClose("treasuryPoints")}>Add points</Button>
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
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleClose("wonderPoints")}>Cancel</Button>
                            <Button onClick={() => handleClose("wonderPoints")}>Add points</Button>
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
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleClose("civilianStructuresPoints")}>Cancel</Button>
                            <Button onClick={() => handleClose("civilianStructuresPoints")}>Add points</Button>
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
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleClose("scientificPoints")}>Cancel</Button>
                            <Button onClick={() => handleClose("scientificPoints")}>Add points</Button>
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
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleClose("commercialPoints")}>Cancel</Button>
                            <Button onClick={() => handleClose("commercialPoints")}>Add points</Button>
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
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleClose("guildPoints")}>Cancel</Button>
                            <Button onClick={() => handleClose("guildPoints")}>Add points</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
           <Button variant="contained" size="large" color="success" onClick={ endGame }>End Game</Button>
           {/* When play game button is clicked, I want to get the end time timestamp for the current game */}
        </>
    );
};

export default EndOfGameScoring;