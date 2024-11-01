import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Container, CircularProgress, Alert, Card, CardContent } from '@mui/material';
import Navbar from './components/PatientNavbar';
import { jwtDecode } from 'jwt-decode';

interface Appointment {
  date: string;
  time: string;
  doctorId: string;
  isCompleted: boolean;
  doctorName?: string; // This will be populated from the doctor API
}

const GetAppointment: React.FC = () => {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointment = async () => {
        try {
            setLoading(true);
            const token = sessionStorage.getItem('token');
            if (!token) {
                throw new Error("Token not found in session storage");
            }
            const decodedToken: { username: string } = jwtDecode(token);
            const username = decodedToken.username;

            // Fetch appointments
            const response = await axios.get(`http://localhost:5000/api/appointments/patient/username/${username}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 404) {
                console.log('Patient not found');
                return;
            }

            const appointmentsArray = response.data; // Assuming this is an array
            if (appointmentsArray.length === 0) {
                console.log("No upcoming appointments");
                return;
            }

            // Handle the first appointment as an example
            const firstAppointment = appointmentsArray[0];

            // Fetch the doctor's name using doctorId from the first appointment
            const doctorResponse = await axios.get(`http://localhost:5000/api/doctors/${firstAppointment.doctorId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setAppointment({ ...firstAppointment, doctorName: doctorResponse.data.name });
        } catch (err) {
            console.log(err);
            setError('Failed to load appointment');
        } finally {
            setLoading(false);
        }
    };

    fetchAppointment();
}, []);


  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Appointment Card */}
      <Container>
        <Box mt={4} display="flex" justifyContent="center">
          {appointment && !appointment.isCompleted ? (
            <Card
              sx={{
                maxWidth: 500,
                width: '100%',
                padding: 2,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                backgroundColor: '#f5f5f5',
              }}
            >
              <CardContent>
                <Typography variant="h5" color="primary" textAlign="center" gutterBottom>
                  Your Upcoming Appointment
                </Typography>
                <Box mt={2} textAlign="center">
                  <Typography variant="h6" color="textSecondary">
                    Date: {appointment.date}
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    Time: {appointment.time}
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    Doctor: {appointment.doctorName}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Box textAlign="center" mt={4}>
              <Typography variant="h6" color="textSecondary">
                There is no upcoming appointment.
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default GetAppointment;
