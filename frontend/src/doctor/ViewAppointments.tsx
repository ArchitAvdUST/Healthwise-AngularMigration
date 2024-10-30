import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const ViewAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]); // Adjust type as needed

  /*useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments'); // Update with your API endpoint
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []); */

  return (
    <Container>
      <Typography variant="h4" gutterBottom>View Appointments</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.patientName}</TableCell>
                <TableCell>{appointment.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ViewAppointments;
