import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Stack,
  Grid,
} from '@mui/material';
import AdminNavbar from './components/AdminNavBar';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [patientsCount, setPatientsCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [reviews, setReviews] = useState<any[]>([]);

  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [doctorsResponse, patientsResponse, revenueResponse, reviewsResponse] = await Promise.all([
          axios.get('/api/doctors'),
          axios.get('/api/patients'),
          axios.get('/api/revenue'),
          axios.get('/api/reviews'),
        ]);
        setDoctors(doctorsResponse.data);
        setPatientsCount(patientsResponse.data.count);
        setRevenue(revenueResponse.data.total);
        setReviews(reviewsResponse.data);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      <AdminNavbar />

      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 64px)', // Adjust based on the height of your navbar
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          bgcolor="#f5f5f5"
          borderRadius="8px"
          boxShadow="0 8px 24px rgba(0, 0, 0, 0.5)"
          p={4}
          width="100%"
        >
          <Typography variant="h4" color="primary" textAlign="center" mb={2}>
            Admin Dashboard
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" color="primary" mb={1}>
                Total Doctors: {doctors.length}
              </Typography>
              <Typography variant="h6" color="primary" mb={1}>
                Total Patients: {patientsCount}
              </Typography>
              <Typography variant="h6" color="primary" mb={1}>
                Total Revenue: ${revenue.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>

          <Stack spacing={3} direction="row" justifyContent="center" mt={3}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => navigate('/admin/add-doctors')}
              sx={{
                '&:hover': { backgroundColor: '#003366' }
              }}
            >
              Add Doctor
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => navigate('/admin/delete-doctors')}
              sx={{
                '&:hover': { backgroundColor: '#003366' }
              }}
            >
              Delete Doctor
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => navigate('/admin/generate-bills')}
              sx={{
                '&:hover': { backgroundColor: '#003366' }
              }}
            >
              Generate Bill
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => navigate('/admin/view-reviews')}
              sx={{
                '&:hover': { backgroundColor: '#003366' }
              }}
            >
              View Reviews
            </Button>
          </Stack>
        </Box>
      </Container>
    </div>
  );
};

export default AdminDashboard;
