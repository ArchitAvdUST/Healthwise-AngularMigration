import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  TextField,
  Alert,
  Container,
} from '@mui/material';
import AdminNavbar from './components/AdminNavBar'; // Adjust the path as necessary

const AddDoctor: React.FC = () => {
  const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Handle adding a new doctor
  /*
  const handleAddDoctor = async () => {
    try {
      const response = await axios.post('/api/doctors', newDoctor); // Adjust the endpoint as needed
      setSuccess(true);
      setNewDoctor({ name: '', specialty: '' }); // Reset the form
      setError(null); // Clear any previous error
    } catch (error) {
      setError('Failed to add doctor. Please try again.');
      setSuccess(false);
    }
  };
   */
  return (
    <div>
      <AdminNavbar /> {/* Include the navbar here */}

      <Container>
        <Typography variant="h4" gutterBottom>
          Add New Doctor
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
          <Button variant="contained" color="primary" /*onClick={handleAddDoctor}*/>
            Add Doctor
          </Button>
        </Box>

        {/* Error and success messages */}
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Doctor added successfully!</Alert>}
      </Container>
    </div>
  );
};

export default AddDoctor;
