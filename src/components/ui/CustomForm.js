import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const ButtonWrapper = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 1),
}));

const CustomForm = ({ handleSubmit, handleCancel, children }) => (
  <form onSubmit={handleSubmit}>
    {children}
    <ButtonWrapper variant="contained" onClick={handleCancel}>Cancel</ButtonWrapper>
    <ButtonWrapper type="submit" variant="contained">Place Order</ButtonWrapper>
  </form>
);

export default CustomForm;
