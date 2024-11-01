import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import AdminNavbar from './components/AdminNavBar'; // Adjust the path as necessary

const GenerateBill: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the list of patients and their total costs
  /* useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('/api/patients/costs'); // Adjust the endpoint as needed
        setPatients(response.data);
      } catch (err) {
        setError('Failed to load patients information');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Handle generating a bill
  const handleGenerateBill = async (patientId: string) => {
    try {
      await axios.post(`/api/patients/${patientId}/generate-bill`); // Adjust the endpoint as needed
      alert('Bill generated successfully for patient ID: ' + patientId);
      // Optionally, refresh the patient list or show updated data here
    } catch (error) {
      console.error('Failed to generate bill:', error);
    }
  
  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  } */

  return (
    <div>
      <AdminNavbar /> {/* Include the navbar here */}

      <Container>
        <Typography variant="h4" gutterBottom>
          Generate Bills
        </Typography>

        {/* List of patients and their costs */}
        <Stack spacing={2}>
          {patients.map((patient) => (
            <Box key={patient.id} display="flex" justifyContent="space-between" alignItems="center" padding={2} borderBottom="1px solid #ccc">
              <Typography>
                {patient.name} - Total Cost: ${patient.totalCost.toFixed(2)}
              </Typography>
              <Button variant="contained" color="primary" /* onClick={() => handleGenerateBill(patient.id)} */>
                Generate Bill
              </Button>
            </Box>
          ))}
        </Stack>
      </Container>
    </div>
  );
};

export default GenerateBill;
