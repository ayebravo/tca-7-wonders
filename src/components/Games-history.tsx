import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { format } from 'date-fns'; // package used to format dates
import '../styles/Games-history.css';
import { gameResult, player } from '../App';

interface GamesHistoryProps {
    gamesData: gameResult[]
}

const GamesHistory: React.FC<GamesHistoryProps> = ({ gamesData }) => {

    const createData = (end: string, players: player[], gameResult: string) => {
        const playersFormattedList = players.map(player => player.name).join(", ");
        return { end, playersFormattedList, gameResult };
    };

    const rows = gamesData.map((game:gameResult) => createData(game.end, game.players, game.gameResult));
    const sortedRows = [...rows].sort((a, b) => a.end.localeCompare(b.end)).reverse();

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
                        <TableCell align="left">Players</TableCell>
                        <TableCell align="center">W/L</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {sortedRows.map((row: any) => (
                        <TableRow
                            key={`row_${row.end}`}
                            sx={{ '&:last-child td, &:last-child th': { uniqueID: 0 } }}
                        >
                        <TableCell key={`cell_${row.end}`} component="th" scope="row">
                            {format(new Date(row.end), 'MM/dd/yyyy')}
                        </TableCell>
                        <TableCell align="left">{row.playersFormattedList}</TableCell>
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