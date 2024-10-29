import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Typography, Button, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/PatientNavbar';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
}

const DoctorSelection: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = sessionStorage.getItem('token');
      const selectedSymptom = sessionStorage.getItem('selectedSymptom');

      try {
        const response = await axios.get(`/api/doctors?symptom=${selectedSymptom}`, {
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

  const handleChooseDoctor = (doctorId: string) => {
    navigate('/choose-appointment', { state: { doctorId } }); // Navigate and pass doctor ID as state
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
        <Box 
          display="flex" 
          flexDirection="row" 
          flexWrap="wrap" 
          justifyContent="center" 
          gap={2} // Adjust spacing between cards
        >
          {doctors.map((doctor) => (
            <Card 
              variant="outlined" 
              key={doctor.id} 
              sx={{ width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}
            >
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  {doctor.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Specialization: {doctor.specialization}
                </Typography>
              </CardContent>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleChooseDoctor(doctor.id)} 
                sx={{ mb: 2 }}
              >
                Choose Doctor
              </Button>
            </Card>
          ))}
        </Box>
      </Container>
    </div>
  );
};

export default DoctorSelection;
