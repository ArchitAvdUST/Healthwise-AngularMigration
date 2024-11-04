import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import AdminNavbar from './components/AdminNavBar'; // Adjust the path as necessary

const GenerateBill: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the list of patients and their total costs
  /*
  useEffect(() => {
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
      alert('Failed to generate bill for patient ID: ' + patientId);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }
    */
  return (
    <div>
      <AdminNavbar /> {/* Include the navbar here */}

      <Container>
        <Typography variant="h4" gutterBottom align="center">
          Generate Bills
        </Typography>

        {/* Table of patients and their costs */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient Name</TableCell>
                <TableCell>Total Cost</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>${patient.totalCost.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      /*onClick={() => handleGenerateBill(patient.id)} */
                    >
                      Generate Bill
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default GenerateBill;
