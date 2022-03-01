import Typography from '@mui/material/Typography';
import '../styles/GamesHistory.css';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const GamesHistory = () => {

    function createData(
        name: string,
        opponents: string[],
        gameResult: string
    ) {
        return { name, opponents, gameResult };
    }

    const rows = [
        createData('1/02/22', ["Me", "Sam"], "W"),
        createData('1/03/22', ["Me", "Sam", "Silvia"], "W"),
        createData('1/28/22', ["Me", "Fermin" , "Sam"], "L"),
        createData('2/02/22', ["Me", "Sam", "Santi", "Vic"], "L"),
        createData('2/13/22', ["Me", "Ellen", "Sam"], "W"),
    ];

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
                {rows.map((row) => (
                    <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.name}
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