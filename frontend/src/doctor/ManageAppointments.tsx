import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from './components/DoctorNavbar'; // Import Navbar
import { jwtDecode } from 'jwt-decode';

const ManageAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching
      try {
        const token = sessionStorage.getItem('token'); // Get the token from local storage
      if (token) {
          const decodedToken:{username: string} = jwtDecode(token);
          const username = decodedToken.username;
          const response = await axios.get(`http://localhost:5000/api/appointments/doctor/username/${username}`); // Adjust API endpoint as needed
        setAppointments(response.data);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('Failed to fetch appointments.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleMarkAsCompleted = (id: string) => {
    // Navigate to the DoctorActions page when the button is clicked
    sessionStorage.setItem('appointmentId', id);
    navigate(`/doctor/actions`); // Adjust the route as necessary
  };

  // Filter appointments to show only those that are not completed
  const notCompletedAppointments = appointments.filter(appointment => !appointment.isCompleted);

  return (
    <>
      <Navbar />
      <Container sx={{ paddingTop: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Manage Appointments</Typography>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}

        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notCompletedAppointments.map((appointment) => (
                <TableRow key={appointment._id}> {/* Ensure appointment.id exists */}
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.patientName || appointment.patientId}</TableCell> {/* Use patient name if available */}
                  <TableCell>{appointment.isCompleted ? 'Completed' : 'Not Completed'}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleMarkAsCompleted(appointment._id)} // Ensure appointment.id is correct
                      sx={{ borderRadius: '5px', padding: '6px 12px' }}
                    >
                      Take Action
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {notCompletedAppointments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No pending appointments
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default ManageAppointments;
