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

const DeleteDoctor: React.FC = () => {
  const [doctorId, setDoctorId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Handle deleting a doctor
  /*
  const handleDeleteDoctor = async () => {
    try {
      const response = await axios.delete(`/api/doctors/${doctorId}`); // Adjust the endpoint as needed
      setSuccess(true);
      setDoctorId(''); // Reset the input field
      setError(null); // Clear any previous error
    } catch (error) {
      setError('Failed to delete doctor. Please try again.');
      setSuccess(false);
    }
  };
  */

  return (
    <div>
      <AdminNavbar /> {/* Include the navbar here */}

      <Container>
        <Typography variant="h4" gutterBottom>
          Delete Doctor
        </Typography>

        {/* Form to delete a doctor */}
        <Box display="flex" mb={4} alignItems="center">
          <TextField
            label="Doctor ID"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <Button variant="contained" color="secondary" /* onClick={handleDeleteDoctor} */>
            Delete Doctor
          </Button>
        </Box>

        {/* Error and success messages */}
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Doctor deleted successfully!</Alert>}
      </Container>
    </div>
  );
};

export default DeleteDoctor;
