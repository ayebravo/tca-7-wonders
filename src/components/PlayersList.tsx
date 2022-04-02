import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

interface PlayersListProps {
    playersData: any[],
    setCheckedPlayersList: (p: any) => void,
    checkedPlayersList: any
}

const CheckboxListSecondary: React.FC<PlayersListProps> = ({ playersData, checkedPlayersList, setCheckedPlayersList }) => {
  
    const handleToggle = (value: number) => () => {
      const currentIndex = checkedPlayersList.indexOf(value);
      const newChecked = [...checkedPlayersList];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setCheckedPlayersList(newChecked);
    };

  
    return (
      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent' }}>
        {playersData.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value.name}`;
          return (
            <ListItem
              key={value.uniqueID}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(value.uniqueID)}
                  checked={checkedPlayersList.indexOf(value.uniqueID) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar>{value.name.slice(0, 1)}</Avatar>
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${value.name}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    );
  }

export default CheckboxListSecondary;