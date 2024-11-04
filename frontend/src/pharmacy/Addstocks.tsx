import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import axios from 'axios';

const AddStocks: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [stock, setStock] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    

    try {
      const newStock = { name, price, stock };
      const response = await axios.post('http://localhost:5000/api/pharmacy/add-stock', newStock); // Adjust the endpoint as necessary
      setSuccessMessage('Stock added successfully!');
      // Clear the form after successful submission
      setName('');
      setPrice('');
      setStock('');
    } catch (error) {
      setErrorMessage('Error adding stock. Please try again.');
    } 
  };   

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Add New Stock</Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Medicine Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Price"
            variant="outlined"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <TextField
            label="Stock Quantity"
            variant="outlined"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Add Stock
          </Button>
          {successMessage && <Typography color="green">{successMessage}</Typography>}
          {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        </Box>
      </form>
    </Container>
  );
};

export default AddStocks;
