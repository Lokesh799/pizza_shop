import React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const CustomSelect = ({ label, value, onChange, options }) => (
  <FormControl fullWidth sx={{ marginBottom: '16px' }}>
    <InputLabel>{label}</InputLabel>
    <Select name={label.toLowerCase()} value={value} onChange={onChange}>
      {options.map((option) => (
        <MenuItem key={option} value={option}>{option}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default CustomSelect;
