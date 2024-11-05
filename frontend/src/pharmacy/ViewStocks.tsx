import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import PharmacyNavbar from './components/PharmacyNavbar';

interface Medicine {
  name: string;   // Name of the medicine
  price: string;  // Price of the medicine
  stock: string;  // Quantity in stock
}

const ViewStocks: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch medicines data from the API
  
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pharmacies'); // Adjust the endpoint as necessary
        setMedicines(response.data); // Assuming the response is an array of medicines
      } catch (error) {
        setError('Error fetching stocks');
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <>
    <PharmacyNavbar />
    <br />
    <Container>
      <Typography variant="h4" gutterBottom>Medicine Stocks</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicines.map((medicine) => (
              <TableRow key={medicine.name}>
                <TableCell>{medicine.name}</TableCell>
                <TableCell>{medicine.price}</TableCell>
                <TableCell>{medicine.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </>
  );
};

export default ViewStocks;
