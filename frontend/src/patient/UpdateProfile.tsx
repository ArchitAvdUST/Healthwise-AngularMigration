import React, { useEffect, useState } from 'react';
import { Box, TextField, MenuItem, Button, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import PatientNavbar from './components/PatientNavbar'; // Assuming Navbar is in the same directory
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface PatientDetails {
  name: string;
  age: number;
  sex: string;
  phone: string;
  email: string;
  address: string;
}

const UpdateDetails: React.FC = () => {
  const [details, setDetails] = useState<PatientDetails>({
    name: '',
    age: 0,
    sex: '',
    phone: '',
    email: '',
    address: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Fetch patient details from API and pre-fill form fields
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const token = sessionStorage.getItem('token');
            if (!token) {
                throw new Error("Token not found in session storage");
            }
            const decodedToken: { username: string } = jwtDecode(token);
            const username = decodedToken.username; // Retrieve username
        const response = await axios.get(`http://localhost:5000/api/patients/${username}`, {
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
      const token = sessionStorage.getItem('token');
            if (!token) {
                throw new Error("Token not found in session storage");
            }
            const decodedToken: { username: string } = jwtDecode(token);
            const username = decodedToken.username; // Retrieve username
      await axios.put(`http://localhost:5000/api/patients/${username}`, details, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Details updated successfully');
      navigate('/patient/dashboard');
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
              name="sex"
              value={details.sex}
              onChange={handleChange}
              fullWidth
              margin="normal"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
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
