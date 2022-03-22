import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import { wonder } from '../App';

interface WonderOptionsProps {
    wondersData: wonder[],
    wonderValue: any,
    setWonderValue: (wonder: any) => void
}

const WonderOptions: React.FC<WonderOptionsProps> = ({wondersData, wonderValue, setWonderValue}) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWonderValue((event.target as HTMLInputElement).value);
    };

    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={wonderValue}
                onChange={handleChange}
            >   
                {
                    wondersData.map(wonder => {
                        return <FormControlLabel key={wonder.uniqueID} value={wonder.uniqueID} control={<Radio />} label={wonder.name} />
                    })
                }
            </RadioGroup>
        </FormControl>
  );
}

export default WonderOptions;