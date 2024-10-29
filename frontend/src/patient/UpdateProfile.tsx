import React, { useEffect, useState } from 'react';
import { Box, TextField, MenuItem, Button, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import PatientNavbar from './components/PatientNavbar'; // Assuming Navbar is in the same directory

interface PatientDetails {
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  address: string;
  username: string;
}

const UpdateDetails: React.FC = () => {
  const [details, setDetails] = useState<PatientDetails>({
    name: '',
    age: 0,
    gender: '',
    phone: '',
    email: '',
    address: '',
    username: '',
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch patient details from API and pre-fill form fields
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Retrieve token
        const response = await axios.get('/api/patient/details', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDetails(response.data); // Assuming API returns an object with these properties
      } catch (error) {
        console.error('Error fetching patient details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.put('/api/patient', details, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Details updated successfully');
    } catch (error) {
      console.error('Error updating details:', error);
      alert('Failed to update details');
    }
  };

  return (
    <>
      <PatientNavbar />

      <Box sx={{ padding: 3, maxWidth: 600, margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom>
          Update Details
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <TextField
              label="Name"
              name="name"
              value={details.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Age"
              name="age"
              type="number"
              value={details.age}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="Gender"
              name="gender"
              value={details.gender}
              onChange={handleChange}
              fullWidth
              margin="normal"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
            <TextField
              label="Phone"
              name="phone"
              value={details.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={details.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              name="address"
              value={details.address}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              margin="normal"
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ marginTop: 2 }}
            >
              Update Details
            </Button>
          </>
        )}
      </Box>
    </>
  );
};

export default UpdateDetails;
