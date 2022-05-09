import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const BasicPopover = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const pointsInformationIconTooltip = "For more information on how to score points, please visit ";

  return (
    <div>
      <Button className='pointsInformationIcon' aria-describedby={id} variant="text" onClick={handleClick}>
        <InfoOutlinedIcon/>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography style={{ padding: "0.5em" }} variant='body2'>{pointsInformationIconTooltip}
            <a href='https://www.ultraboardgames.com/7wonders/scoring.php' target="_blank">Scoring Points in 7 Wonders</a>
        </Typography>
      </Popover>
    </div>
  );
}

export default BasicPopover;