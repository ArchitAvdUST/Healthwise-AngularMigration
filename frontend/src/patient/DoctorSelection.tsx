import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/PatientNavbar';

interface Doctor {
  name: string;
  username: string;
  specialization: string;
  description: string;
  imageUrl: string;
}

const DoctorSelection: React.FC = () => {
  const imageUrl = '/doctor_sample.jpg'
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({}); // Track expanded state for each doctor

 /* useEffect(() => {
    const fetchDoctors = async () => {
      /*const token = sessionStorage.getItem('token');

      try {
        const response = await axios.get(`http://localhost:5000/api/doctors`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setDoctors(response.data); 
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []); */

  const handleChooseDoctor = (doctorUsername: string) => {
    sessionStorage.setItem('doctorUserName', doctorUsername);
    navigate('/patient/choose-appointment', { state: { doctorUsername } });
  };

  const toggleExpanded = (username: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [username]: !prevExpanded[username],
    }));
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
            gap={2}
            padding={2}
            sx={{
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              scrollbarWidth: 'thin',
              '&::-webkit-scrollbar': { height: '8px' },
              '&::-webkit-scrollbar-track': { backgroundColor: '#f0f0f0' },
              '&::-webkit-scrollbar-thumb': { backgroundColor: '#b0b0b0', borderRadius: '4px' },
            }}
          >
            {doctors.map((doctor) => (
              <Card
                key={doctor.username}
                variant="outlined"
                sx={{
                  width: 300,
                  display: 'inline-block',
                  flexShrink: 0,
                  textAlign: 'center',
                  m: 1,
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  borderRadius: 2,
                }}
              >
                <CardMedia
                  component="img"
                  alt={`Dr. ${doctor.username}`}
                  height="360" // Fixed height
                  image={imageUrl}
                  sx={{ objectFit: 'cover' }} // Maintain cover behavior
                />
                <CardContent>
                  <Typography variant="h6" color="primary">
                    {doctor.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Specialization: {doctor.specialization}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    mt={1}
                    sx={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      ...(expanded[doctor.username] ? { WebkitLineClamp: 'none' } : { WebkitLineClamp: 3 }), // Show 3 lines initially or none if expanded
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {doctor.description}
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => toggleExpanded(doctor.username)}
                    sx={{ mt: 1 }}
                  >
                    {expanded[doctor.username] ? 'Show less' : 'Read more'}
                  </Button>
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
