import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Container, CircularProgress, Alert, Stack } from '@mui/material';
import Navbar from './components/PatientNavbar';

const PatientDashboard: React.FC = () => {
  const [patientName, setPatientName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 {/* useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem('token');
        const response = await axios.get('/api/patient', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatientName(response.data.name);
      } catch (err) {
        setError('Failed to load patient information');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }
    */}

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Container with options */}
      <Container>
        <Box
          display="flex"
          flexDirection="row"
          bgcolor="#f5f5f5"
          borderRadius="8px"
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
          p={4}
          mt={4}
          width="100%"
          maxWidth="800px"
          mx="auto"
        >
          {/* Left Half: Greeting */}
          <Box flex={1} display="flex" alignItems="center" justifyContent="center">
            <Typography variant="h4" color="primary">
              Hi, {patientName}!
            </Typography>
          </Box>

          {/* Right Half: Buttons */}
          <Box flex={1} display="flex" alignItems="center" justifyContent="center">
            <Stack spacing={2} width="100%" maxWidth="200px">
              <Button variant="contained" color="primary" fullWidth>
                Get Appointments
              </Button>
              <Button variant="contained" color="primary" fullWidth>
                Book Appointment
              </Button>
              <Button variant="contained" color="primary" fullWidth>
                Get Medical History
              </Button>
              <Button variant="contained" color="primary" fullWidth>
                View Bills
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default PatientDashboard;
