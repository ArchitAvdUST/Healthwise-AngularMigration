import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  Container,
  TextField,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';

const ManageDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '' });

  // Fetch the list of doctors
  /* useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('/api/doctors'); // Adjust the endpoint as needed
        setDoctors(response.data);
      } catch (err) {
        setError('Failed to load doctors information');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Handle deleting a doctor
  const handleDeleteDoctor = async (doctorId: string) => {
    try {
      await axios.delete(`/api/doctors/${doctorId}`); // Adjust the endpoint as needed
      setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
    } catch (error) {
      console.error('Failed to delete doctor:', error);
    }
  };

  // Handle adding a new doctor
  const handleAddDoctor = async () => {
    try {
      const response = await axios.post('/api/doctors', newDoctor); // Adjust the endpoint as needed
      setDoctors([...doctors, response.data]); // Add the new doctor to the list
      setNewDoctor({ name: '', specialty: '' }); // Reset the form
    } catch (error) {
      console.error('Failed to add doctor:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }  */

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Doctors
      </Typography>

      {/* Form to add a new doctor */}
      <Box display="flex" mb={4} alignItems="center">
        <TextField
          label="Doctor Name"
          value={newDoctor.name}
          onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Specialty"
          value={newDoctor.specialty}
          onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" /*onClick={handleAddDoctor} */>
          Add Doctor
        </Button>
      </Box>

      {/* List of doctors */}
      <Typography variant="h6" gutterBottom>
        Current Doctors:
      </Typography>
      <Stack spacing={2}>
        {doctors.map((doctor) => (
          <Box key={doctor.id} display="flex" justifyContent="space-between" alignItems="center">
            <Typography>{doctor.name} - {doctor.specialty}</Typography>
            <Button variant="outlined" color="secondary" /* </Box>onClick={() => handleDeleteDoctor(doctor.id)} */>
              Delete
            </Button>
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default ManageDoctors;
