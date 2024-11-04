import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  TextField,
  Alert,
  Container,
  Paper,
  Grid,
} from '@mui/material';
import AdminNavbar from './components/AdminNavBar'; // Adjust the path as necessary

const DeleteDoctor: React.FC = () => {
  const [doctorId, setDoctorId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Handle deleting a doctor
  const handleDeleteDoctor = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/doctors/${doctorId}`); // Adjust the endpoint as needed
      await axios.delete(`http://localhost:5000/api/users/${doctorId}`);
      setSuccess(true);
      setDoctorId(''); // Reset the input field
      setError(null); // Clear any previous error
    } catch (error) {
      setError('Failed to delete doctor. Please try again.');
      setSuccess(false);
    }
  };

  return (
    <div>
      <AdminNavbar /> {/* Include the navbar here */}

      <Container component={Paper} elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Delete Doctor
        </Typography>

        {/* Form to delete a doctor */}
        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleDeleteDoctor(); }} display="flex" flexDirection="column" alignItems="center">
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Doctor Username"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="secondary" type="submit">
            Delete Doctor
          </Button>
        </Box>

        {/* Error and success messages */}
        {error && <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ marginTop: 2 }}>Doctor deleted successfully!</Alert>}
      </Container>
    </div>
  );
};

export default DeleteDoctor;
