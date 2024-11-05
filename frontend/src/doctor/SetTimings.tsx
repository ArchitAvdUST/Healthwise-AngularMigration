import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import {
  Box,
  Button,
  Container,
  Typography,
  Snackbar,
  Alert,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DoctorNavbar from './components/DoctorNavbar';

interface DecodedToken {
  username: string;
}

const DoctorTimingsForm: React.FC = () => {
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        setDoctorId(decodedToken.username);
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    }
  }, []);

  const validateAndSetTime = (time: string, setTime: (value: string) => void) => {
    const [hours, minutes] = time.split(':').map(Number);

    if (minutes % 15 !== 0) {
      const nearestMinutes = Math.round(minutes / 15) * 15;
      const validTime = `${String(hours).padStart(2, '0')}:${String(nearestMinutes).padStart(2, '0')}`;
      setTime(validTime);
      setSnackbarMessage(`Time adjusted to nearest 15-minute interval: ${validTime}`);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } else {
      setTime(time);
    }
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateAndSetTime(e.target.value, setStartTime);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateAndSetTime(e.target.value, setEndTime);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!doctorId || !date || !startTime || !endTime) {
      setSnackbarMessage('All fields are required.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/timings', {
        doctorId,
        date,
        start: startTime,
        end: endTime,
      });

      setSnackbarMessage('Timings created successfully.');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      setDate('');
      setStartTime('');
      setEndTime('');

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/doctor/dashboard');  // Replace '/some-other-page' with your target route
      }, 1000);
    } catch (error) {
      setSnackbarMessage('Error creating timings.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
    <DoctorNavbar />
    <Container maxWidth="sm" >
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Set Your Working Hours
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Doctor ID"
            value={doctorId}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Start Time"
            type="time"
            value={startTime}
            onChange={handleStartTimeChange}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="End Time"
            type="time"
            value={endTime}
            onChange={handleEndTimeChange}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Submit Timings
          </Button>
        </form>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
    </>
  );
};

export default DoctorTimingsForm;
