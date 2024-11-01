import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(''); // Clear any previous error

    try {
      // Send login request to backend
      // Send login request to backend using GET
const response = await axios.post(`http://localhost:5000/api/users/login`, {
    username,
    password
});


if (response.status === 200 && response.data.token) {
  // Extract the JWT token from the response
  const token = response.data.token;

  // Fetch user role after successful login, using the token in the Authorization header
  const roleResponse = await axios.get(`http://localhost:5000/api/users/${username}/role`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  // Get the user role from the response
  const userRole = roleResponse.data;
  console.log(userRole);
  sessionStorage.setItem('token', token);

        // Route based on role
        if (userRole === 'patient') {
          navigate('/patient/dashboard');
        } else if (userRole === 'doctor') {
          navigate('/doctor/dashboard');
        } else if (userRole === 'admin') {
          navigate('/admin/dashboard');
        } else {
          setError('Unrecognized role.');
        }
      } else {
        setError('Invalid username or password.');
      }
    } catch (error) {
      console.error('Login error', error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, mb: 2 }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleLogin}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;