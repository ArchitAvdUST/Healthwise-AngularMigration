import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Import JWT decode library
import { Button, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // for navigation
import { decode } from 'punycode';

// Define the structure of the data we'll display in the table
interface BillingRecord {
  patientId: string;
  appointmentId: string;
}

const ShowBill: React.FC = () => {
  const [billingRecords, setBillingRecords] = useState<BillingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch the patientId from the token
  const getPatientIdFromToken = () => {
    const token = sessionStorage.getItem('token'); // Get token from localStorage or sessionStorage
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      console.log(decodedToken.username); // Decode the JWT token
      return decodedToken.username; // Assuming patientId is in the token payload
    } catch (error) {
      return null;
    }
  };

  const patientId = getPatientIdFromToken();

  // Fetch the billing data for the specific patient
  useEffect(() => {
    const fetchBillingData = async () => {
      if (!patientId) {
        setError('Patient ID is missing or invalid');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/billings/patient/${patientId}`); // Use the patientId in the API call
        setBillingRecords(response.data); // Assuming the response contains an array of billing records
      } catch (err) {
        setError('Failed to load billing data');
      } finally {
        setLoading(false);
      }
    };

    fetchBillingData();
  }, [patientId]);

  // Handle the "See Bill" button click
  const handleSeeBill = (appointmentId: string) => {
    sessionStorage.setItem('appointmentId', appointmentId);
    // Navigate to the SeeBill page, passing the appointmentId in the URL
    navigate(`/patient/Seebill`);
  };

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error" align="center">{error}</Typography>;
  }

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Billing Records
      </Typography>

      {/* Table to display billing records */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient ID</TableCell>
              <TableCell>Appointment ID</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {billingRecords.map((record) => (
              <TableRow key={record.appointmentId}>
                <TableCell>{record.patientId}</TableCell>
                <TableCell>{record.appointmentId}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSeeBill(record.appointmentId)}
                  >
                    See Bill
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ShowBill;
