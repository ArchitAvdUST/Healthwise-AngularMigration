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

const AddDoctor: React.FC = () => {
  const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Handle adding a new doctor
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

  return (
    <div>
      <AdminNavbar /> {/* Include the navbar here */}

      <Container component={Paper} elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Add New Doctor
        </Typography>

        {/* Form to add a new doctor */}
        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleAddDoctor(); }} display="flex" flexDirection="column" alignItems="center">
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Doctor Name"
                value={newDoctor.name}
                onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Specialty"
                value={newDoctor.specialty}
                onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" type="submit">
            Add Doctor
          </Button>
        </Box>

        {/* Error and success messages */}
        {error && <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ marginTop: 2 }}>Doctor added successfully!</Alert>}
      </Container>
    </div>
  );
};

export default AddDoctor;
