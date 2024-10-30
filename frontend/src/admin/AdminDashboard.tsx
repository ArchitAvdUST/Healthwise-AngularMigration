import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Container, CircularProgress, Alert, Stack } from '@mui/material';
import AdminNavbar from './components/AdminNavBar'; // Assume you have an AdminNavbar component

const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State to manage doctor information
  const [doctors, setDoctors] = useState<any[]>([]);

  // Fetch doctors data from the API
  /* useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/doctors'); // Adjust to your API endpoint
        setDoctors(response.data);
      } catch (err) {
        setError('Failed to load doctors information');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Handle adding a new doctor
  const handleAddDoctor = async () => {
    // Implement the logic to add a doctor
    console.log('Adding a new doctor...');
  };

  // Handle deleting a doctor
  const handleDeleteDoctor = async (doctorId: string) => {
    try {
      await axios.delete(`/api/doctors/${doctorId}`); // Adjust to your API endpoint
      setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
    } catch (error) {
      console.error('Failed to delete doctor:', error);
    }
  };

  // Handle generating a bill
  const handleGenerateBill = () => {
    // Implement the logic to generate a bill
    console.log('Generating bill...');
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }
   */
  return (
    <div>
      {/* Navbar */}
      <AdminNavbar />

      {/* Container with options */}
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          bgcolor="#f5f5f5"
          borderRadius="8px"
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
          p={4}
          mt={4}
          width="100%"
          maxWidth="800px"
          mx="auto"
        >
          {/* Title */}
          <Typography variant="h4" color="primary" textAlign="center" mb={2}>
            Admin Dashboard
          </Typography>

          {/* List of doctors */}
          <Typography variant="h6" color="primary" mb={2}>
            Doctors:
          </Typography>
          <Box mb={2}>
            {doctors.map((doctor) => (
              <Box key={doctor.id} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography>{doctor.name}</Typography>
                <Button variant="outlined" color="secondary" /*onClick={() => handleDeleteDoctor(doctor.id)}*/>
                  Delete
                </Button>
              </Box>
            ))}
          </Box>

          {/* Action Buttons */}
          <Stack spacing={2} width="100%">
            <Button variant="contained" color="primary" /* onClick={handleAddDoctor} */>
              Add Doctor
            </Button>
            <Button variant="contained" color="primary" /* onClick={handleGenerateBill} */>
              Generate Bill
            </Button>
          </Stack>
        </Box>
      </Container>
    </div>
  );
};

export default AdminDashboard;
