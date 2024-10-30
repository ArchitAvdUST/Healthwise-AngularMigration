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
} from '@mui/material';
import axios from 'axios';

const ManageAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /* useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching
      try {
        const response = await axios.get('/api/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('Failed to fetch appointments.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleMarkAsCompleted = async (id: string) => {
    try {
      await axios.patch(`/api/appointments/${id}`, { status: 'completed' }); // Update appointment status
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === id ? { ...appointment, status: 'completed' } : appointment
        )
      );
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  }; */

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Manage Appointments</Typography>

      {loading && <Typography>Loading appointments...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
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
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.patientName}</TableCell>
                <TableCell>{appointment.status}</TableCell>
                <TableCell>
                  {appointment.status !== 'completed' && (
                    <Button /*onClick={() => handleMarkAsCompleted(appointment.id)} */>Mark as Completed</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ManageAppointments;
