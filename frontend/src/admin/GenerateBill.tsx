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
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

interface BillingData {
  patientId: string;
  _id: string;
  patientName: string;
  totalCost: number;
}

const GenerateBill: React.FC = () => {
  const [patients, setPatients] = useState<BillingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize the useNavigate hook
  const navigate = useNavigate();

  // Fetch the list of patients and their total costs
  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/billings'); // Adjust the endpoint as needed
        setPatients(response.data); // Assuming response.data is an array of billing data
      } catch (err) {
        setError('Failed to load billings information');
      } finally {
        setLoading(false);
      }
    };

    fetchBillingData();
  }, []);

  // Handle redirect to the "View Bill" page without generating a bill
  const handleGenerateBill = (billingId: string) => {
    sessionStorage.setItem('billingId',billingId);
    // Redirect to the ViewBill page with the billingId
    navigate(`/admin/view-bills`);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

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
                <TableCell>Billing ID</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell>Total Cost</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient._id}>
                  <TableCell>{patient._id}</TableCell>
                  <TableCell>{patient.patientName}</TableCell>
                  <TableCell>${patient.totalCost}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleGenerateBill(patient._id)} // Just navigate without generating a bill
                    >
                      View Bill
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
