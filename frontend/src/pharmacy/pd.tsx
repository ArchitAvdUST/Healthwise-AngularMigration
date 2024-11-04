import React from 'react';
import { Box, Button, Typography, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/PharmacyNavbar'; // Adjust the import as necessary

const PharmacyDashboard: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <Box>
      <Navbar />
      <Container sx={{ padding: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: '800px',
            transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
            padding: 2,
            borderRadius: 2,
            backgroundColor: 'white',
            '&:hover': {
              boxShadow: '0px 10px 50px rgba(0, 0, 0, 0.6)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          {/* Greeting for Pharmacist */}
          <Typography variant="h4" mb={2}>Hi, Pharmacist</Typography>

          {/* Grid for Function Buttons */}
          <Grid container spacing={2} justifyContent="center">
            {[
              { label: 'View Stocks', path: '/pharmacy/ViewStocks' },
              { label: 'Add Stocks', path: '/pharmacy/Addstocks' },
            ].map(({ label, path }) => (
              <Grid item xs={6} key={label}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => navigate(path)} // Redirect on click
                  sx={{
                    height: '50px', // Uniform height for all buttons
                    '&:hover': {
                      backgroundColor: 'darkblue', // Change color on hover
                    },
                  }}
                >
                  {label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default PharmacyDashboard;
