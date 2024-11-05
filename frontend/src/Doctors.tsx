import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
import axios from 'axios';

interface Doctor {
    name: string;
    username: string;
    specialization: string;
    description: string;
    imageUrl: string;
  }

const DoctorPage = () => {
    const imageUrl = '/doctor_sample.jpg'
    const [doctors, setDoctors] = useState<Doctor[]>([]);

  // Fetch doctors data from the backend
  useEffect(() => {
    const fetchDoctors = async () => {

      try {
        const response = await axios.get(`http://localhost:5000/api/doctors`);
        setDoctors(response.data); 
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Meet Our Doctors
      </Typography>
      <Grid container spacing={3}>
        {{doctors.length > 0 ? (
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
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Box mt={4} textAlign="center">
            <Typography variant="h6" color="textSecondary">
              No doctors available for the selected symptom. Please try a different symptom.
            </Typography>
          </Box>
        )}}
      </Grid>
    </Box>
  );
};

export default DoctorPage;
