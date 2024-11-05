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
      const response = await axios.post(`http://localhost:5000/api/users/login`, {
        username,
        password,
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
        } else if (userRole === 'pharmacy') {
          navigate('/pharmacy/dashboard');
        }
        else {
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
    <Container
      component="main"
      maxWidth={false}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Full height to cover the viewport
        background: 'linear-gradient(90deg, #bbdefb 0%, #b2ebf2 50%, #bbdefb 100%)',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '400px', // Set a max width for the login box
          backgroundColor: 'white', // White background for the login container
          padding: '24px',
          border: '1px solid #ccc', // Border for the login container
          borderRadius: '8px',
          boxShadow: 2,
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
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
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#004ba0',
              },
            }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
  
};

export default Login;
