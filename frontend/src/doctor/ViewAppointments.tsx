import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import Navbar from './components/DoctorNavbar'; // Import Navbar
import { jwtDecode } from 'jwt-decode';

interface Appointment {
  id: string;
  date: string;
  patientId: string;
  symptoms: string;
  time: string;
  isCompleted: boolean;
}

const ViewAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in session storage');
        }

        const decodedToken: { username: string } = jwtDecode(token); // Assuming username is part of the token
        const username = decodedToken.username;

        const response = await axios.get(`http://localhost:5000/api/appointments/doctor/username/${username}`); // Update with your API endpoint
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('Failed to load appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  // Filter appointments to show only those that are completed
  const completedAppointments = appointments.filter(appointment => appointment.isCompleted);

  return (
    <>
      <Navbar /> 
      <Container sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom textAlign="center">Completed Appointments</Typography>
        <TableContainer component={Paper} sx={{ marginTop: 2, width: '100%', maxWidth: '800px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell>Symptoms</TableCell>
                <TableCell>Slots</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {completedAppointments.length > 0 ? (
                completedAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.patientId}</TableCell>
                    <TableCell>{appointment.symptoms}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>Completed</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No completed appointments.
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

export default ViewAppointments;
