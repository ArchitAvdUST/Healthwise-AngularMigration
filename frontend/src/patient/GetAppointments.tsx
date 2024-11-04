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
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /*
  useEffect(() => {
    const fetchAppointments = async () => {
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

        const appointmentsArray: Appointment[] = response.data; // Assuming this is an array
        if (appointmentsArray.length === 0) {
          console.log("No upcoming appointments");
          return;
        }

        // Filter appointments where isCompleted is false
        const upcomingAppointments = appointmentsArray.filter(appointment => !appointment.isCompleted);

        if (upcomingAppointments.length === 0) {
          console.log("No upcoming appointments");
          return;
        }

        // Fetch doctor's names for each upcoming appointment
        const appointmentsWithDoctorNames = await Promise.all(
          upcomingAppointments.map(async (appointment) => {
            const doctorResponse = await axios.get(`http://localhost:5000/api/doctors/${appointment.doctorId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            return {
              ...appointment,
              doctorName: doctorResponse.data.name,
            };
          })
        );

        setAppointments(appointmentsWithDoctorNames);
      } catch (err) {
        console.log(err);
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
   */
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Appointment Cards */}
      <Container>
        <Box mt={4} display="flex" flexDirection="column" alignItems="center">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <Card
                key={appointment.doctorId} // Assuming doctorId is unique for each appointment
                sx={{
                  maxWidth: 500,
                  width: '100%',
                  padding: 2,
                  marginBottom: 2,
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
            ))
          ) : (
            <Box textAlign="center" mt={4}>
              <Typography variant="h6" color="textSecondary">
                There are no upcoming appointments.
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default GetAppointment;
