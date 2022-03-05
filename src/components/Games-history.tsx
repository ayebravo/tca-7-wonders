import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../styles/Games-history.css';

interface GamesHistoryProps {
    gamesData: any[];
}

const GamesHistory: React.FC<GamesHistoryProps> = ({ gamesData }) => {

    const getGameResult = (game: any) => {
        return game.winner === "Me" ? "W" : "L"; 
    }

    const createData = (formattedDate: string, players: any[], gameResult: string) => {
        const playersFormattedList = players.map(player => player.name).join(", ");
        return { formattedDate, playersFormattedList, gameResult };
    };

    const rows = gamesData.map((game: any) => createData(game.formattedDate, game.players, getGameResult(game)));

    // TODO: Sort rows so games are displayed chronologically with the latest game at the top
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
                    {rows.map((row: any) => (
                        <TableRow
                            key={row.formattedDate}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.formattedDate}
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