import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Typography, Button, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/PatientNavbar';

interface Doctor {
  username: string;
}

const DoctorSelection: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = sessionStorage.getItem('token');
      const selectedSymptom = sessionStorage.getItem('symptom');

      try {
        const response = await axios.get(`http://localhost:5000/api/doctors/${selectedSymptom}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setDoctors(response.data); // Assuming the response contains the list of doctors
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleChooseDoctor = (doctorUsername: string) => {
    navigate('/choose-appointment', { state: { doctorUsername } });
  };

  if (loading) {
    return (
      <Container>
        <Box mt={4} textAlign="center">
          <Typography variant="h5">Loading doctors...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <div>
      <Navbar />
      <Container>
        <Typography variant="h4" color="primary" gutterBottom textAlign="center" mt={4}>
          Select a Doctor
        </Typography>
        {doctors.length > 0 ? (
          <Box 
            display="flex" 
            flexDirection="row" 
            flexWrap="wrap" 
            justifyContent="center" 
            gap={2}
          >
            {doctors.map((doctor) => (
              <Card 
                variant="outlined" 
                key={doctor.username} 
                sx={{ width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}
              >
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {doctor.username}
                  </Typography>
                </CardContent>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => handleChooseDoctor(doctor.username)} 
                  sx={{ mb: 2 }}
                >
                  Choose Doctor
                </Button>
              </Card>
            ))}
          </Box>
        ) : (
          <Box mt={4} textAlign="center">
            <Typography variant="h6" color="textSecondary">
              No doctors available for the selected symptom. Please try a different symptom.
            </Typography>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default DoctorSelection;
