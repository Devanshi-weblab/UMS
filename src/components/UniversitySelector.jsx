import React from 'react'
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';


const UniversitySelector = ({ value, onChange }) => {
  return (
    <Box sx={{ width: 320 }}>
      <TextField
        select
        fullWidth
        label="University"
        value={value}
        onChange={onChange}
        placeholder="Select University"
        helperText="Choose a university from the list"
        variant="outlined"
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          }
        }}
      >
        <MenuItem value="">
          <em>All Universities</em>
        </MenuItem>
        <MenuItem value="du">Delhi University</MenuItem>
        <MenuItem value="mu">Mumbai University</MenuItem>
        <MenuItem value="pu">Pune University</MenuItem>
      </TextField>
    </Box>
  );
};

export default UniversitySelector
