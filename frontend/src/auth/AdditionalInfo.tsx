import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const AdditionalInfo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username') || '';

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setsex] = useState('male'); // Default sex
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateForm = () => {
    if (!name || !age || !email || !phone || !address) {
      setError('All fields are required.');
      return false;
    }

    if (!/^\d+$/.test(age)) {
      setError('Age must be a number.');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is not valid.');
      return false;
    }

    if (!/^\d+$/.test(phone) || phone.length < 10) {
      setError('Phone number must be at least 10 digits long.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Save data through POST endpoint
    try {
      await axios.post('http://localhost:5000/api/patients', {
        name,
        age,
        sex,
        email,
        phone,
        address,
        username, // Include username if needed
      });
      setSuccess('Information submitted successfully! Please login again');

      // Redirect to the Patient Dashboard after successful submission
      setTimeout(() => {
        navigate('/'); // Adjust this path to your actual patient dashboard route
      }, 3000); // Optional delay for user to see the success message
    } catch (error) {
      console.error('Error submitting information', error);
      setError('Failed to submit information. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, mb: 2 }}>
        <Typography component="h1" variant="h5">
          Additional Information
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="sex-label">sex</InputLabel>
            <Select
              labelId="sex-label"
              value={sex}
              onChange={(e) => setsex(e.target.value)}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AdditionalInfo;
