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
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [doctorsResponse, patientsResponse ] = await Promise.all([
          axios.get('http://localhost:5000/api/doctors'),
          axios.get('http://localhost:5000/api/patients'),
        ]);
        setDoctors(doctorsResponse.data);
        setPatients(patientsResponse.data);
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
                Total Patients: {patients.length}
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
          </Stack>
        </Box>
      </Container>
    </div>
  );
};

export default AdminDashboard;
