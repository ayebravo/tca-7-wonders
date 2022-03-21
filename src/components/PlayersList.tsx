import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { player } from '../App';

interface PlayersListProps {
    playersData: any[],
    setChecked: (p: any) => void,
    checked: any
}

const CheckboxListSecondary: React.FC<PlayersListProps> = ({ playersData, checked, setChecked }) => {
  
    const handleToggle = (value: number) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };

    // TODO: Fix so the "Me" player is checked by default
  
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
                  checked={checked.indexOf(value.uniqueID) !== -1}
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