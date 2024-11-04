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
import { useNavigate } from 'react-router-dom';

const AddDoctor: React.FC = () => {
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    sex: '',
    age: 0,
    email: '',
    phone: '',
    specialization: '',
    username: '',
    description: '',
  });
  const [password, setpassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  // Handle adding a new doctor
  const handleAddDoctor = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/doctors', newDoctor); // Adjust the endpoint as needed
      setSuccess(true);
      setNewDoctor({
        name: '',
        sex: '',
        age: 0,
        email: '',
        phone: '',
        specialization: '',
        username: '',
        description: '',
      }); // Reset the form
      setError(null); // Clear any previous error

      await axios.post(`http://localhost:5000/api/users`,{
        username: newDoctor.username,
        password: password,
        role: 'doctor'
      });
      setTimeout(() => {
        navigate('/admin/dashboard'); // Change this to your desired route
      }, 1000);
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
                label="Sex"
                value={newDoctor.sex}
                onChange={(e) => setNewDoctor({ ...newDoctor, sex: e.target.value })}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Age"
                type="number"
                value={newDoctor.age}
                onChange={(e) => setNewDoctor({ ...newDoctor, age: Number(e.target.value) })}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                type="email"
                value={newDoctor.email}
                onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                value={newDoctor.phone}
                onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Specialization"
                value={newDoctor.specialization}
                onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Username"
                value={newDoctor.username}
                onChange={(e) => setNewDoctor({ ...newDoctor, username: e.target.value })}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline
                rows={4}
                value={newDoctor.description}
                onChange={(e) => setNewDoctor({ ...newDoctor, description: e.target.value })}
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
