import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from './components/DoctorNavbar';

const DoctorDashboard: React.FC = () => {
  const [doctorName, setDoctorName] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Simulated fetch for doctor name
  useEffect(() => {
    const fetchDoctorName = async () => {
      setDoctorName("Dr. Smith");
    };

    fetchDoctorName();
  }, []);

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
            transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out', // Smooth transition for shadow
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', // Always visible shadow
            padding: 2,
            borderRadius: 2,
            backgroundColor: 'white',
            '&:hover': {
              boxShadow: '0px 10px 50px rgba(0, 0, 0, 0.6)', // Darker shadow on hover
              transform: 'translateY(-2px)', // Slight upward tilt effect
            },
          }}
        >
          {/* Greeting for Doctor */}
          <Typography variant="h4" mb={2}>Hi, {doctorName}</Typography>

          {/* Grid for Function Buttons */}
          <Grid container spacing={2} justifyContent="center">
            {[
              { label: 'View Appointments', path: '/doctor/view-appointments' },
              { label: 'Manage Appointments', path: '/doctor/manage-appointments' },
              { label: 'View Medical History', path: '/doctor/view-medical-history' },
              { label: 'Generate Reports', path: '/doctor/generate-reports' },
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

export default DoctorDashboard;
