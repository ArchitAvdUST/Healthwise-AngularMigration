import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Container, Avatar, Stack } from '@mui/material';
import Navbar from './components/DoctorNavbar';

const DoctorDashboard: React.FC = () => {
  const [doctorName, setDoctorName] = useState<string | null>(null);

  // Simulated fetch for doctor name
  useEffect(() => {
    const fetchDoctorName = async () => {
      // Simulate an API call
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
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: '800px',
          }}
        >
          {/* Left Side: Doctor's Name and Photo */}
          <Box display="flex" alignItems="center">
            <Avatar sx={{ width: 56, height: 56, marginRight: 2 }} />
            <Typography variant="h4">{doctorName}</Typography>
          </Box>

          {/* Right Side: Function Buttons */}
          <Stack spacing={2} alignItems="flex-end">
            {['View Appointments', 'Manage Patients', 'View Medical History', 'Generate Reports'].map((label) => (
              <Button
                key={label}
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  width: '200px', // Fixed width for uniformity
                  height: '50px', // Uniform height for all buttons
                  '&:hover': {
                    backgroundColor: 'darkblue', // Change color on hover
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default DoctorDashboard;
