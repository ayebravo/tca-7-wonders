import Typography from '@mui/material/Typography';
import '../styles/Games-history.css';
// import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface GamesHistoryProps {
    gamesData: any[];
}

const GamesHistory: React.FC<GamesHistoryProps> = ({ gamesData }) => {

    const createData = (date: string, opponents: string[], gameResult: string) => {
        return { date, opponents, gameResult };
    };

    const rows = gamesData.map((game: any) => createData(game.date, game.opponents, game.gameResult));

    return (
        <div className='gamesHistoryContainer'>
            <Typography className="Home-Heading" variant="h4" component="div" gutterBottom>
                Games History
            </Typography>

            <TableContainer component={Paper}>
                <Table sx={{ width: "100%", padding: "0.5em 1em" }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="left">Opponents</TableCell>
                        <TableCell align="center">W/L</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row: any) => (
                        <TableRow
                        key={row.date}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.date}
                        </TableCell>
                        <TableCell align="left">{row.opponents.join(", ")}</TableCell>
                        <TableCell align="center">{row.gameResult}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
};

export default GamesHistory;