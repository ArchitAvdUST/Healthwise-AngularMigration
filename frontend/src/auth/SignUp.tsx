import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('patient'); // Default role
  const [error, setError] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password || !confirmPassword) {
      setError('All fields are required.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    if (!validatePassword(password)) {
      return false;
    }
    return true;
  };

  const validatePassword = (password: string) => {
    const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 characters, one uppercase, one lowercase, one number, and one special character
    if (!passwordRequirements.test(password)) {
      setPasswordError('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const checkUsernameExists = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${username}`);
      return response.data; // Assuming the API returns a boolean
    } catch (error) {
      console.error('Error checking username', error);
      return false;
    }
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPasswordValue = event.target.value;
    setConfirmPassword(confirmPasswordValue);

    // Check if the passwords match
    if (confirmPasswordValue !== password) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    const usernameExists = await checkUsernameExists();
    if (usernameExists) {
      setError('Username already exists.');
      return;
    }

    // Save data through POST endpoint
    try {
      await axios.post('http://localhost:5000/api/users', {
        username,
        password,
        role,
      });
      // Redirect to additional information page
      navigate(`/additional-info?username=${username}`);
    } catch (error) {
      console.error('Error creating user', error);
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, mb: 2 }}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
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
            error={!!passwordError} // Highlight if there's an error
            helperText={passwordError} // Show the password requirements message
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange} // Updated to use new handler
            error={passwordMismatch} // Highlight if there is a mismatch
            helperText={passwordMismatch ? 'Passwords do not match.' : ''}
          />
          <FormControl fullWidth margin="normal">
            <Select
              labelId="role-label"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              {/* Add more roles as needed */}
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={passwordMismatch || !!passwordError} // Disable the button if passwords do not match or there are password errors
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
