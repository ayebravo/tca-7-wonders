import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

const CheckboxListSecondary = () => {
    const [checked, setChecked] = React.useState([1]);
  
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
  
    return (
      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent'}}>
        {[{name: "Olimpia", uniqueID: 1}].map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
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