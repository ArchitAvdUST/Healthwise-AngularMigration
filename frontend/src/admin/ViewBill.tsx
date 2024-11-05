import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  Container,
  CircularProgress,
  Alert,
  TextField,
} from '@mui/material';
import AdminNavbar from './components/AdminNavBar'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { Label } from '@mui/icons-material';

interface Billing {
  patientId: string;
  appointmentId: string;
  medicines: string;
  medicinesCost: number;
  consultationCost: number;
  reportId: string;
  reportCost: number;
  totalCost: number;
  dueDate: string;
}

const ViewBill: React.FC = () => {
  const [billingData, setBillingData] = useState<Billing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editableData, setEditableData] = useState<Billing | null>(null);

  const billingId = sessionStorage.getItem('billingId'); // Retrieve billingId from sessionStorage
  const navigate = useNavigate();

  // Fetch the billing data from the backend
  useEffect(() => {
    if (billingId) {
      const fetchBillingData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/billings/${billingId}`); // Endpoint to get billing by ID
          setBillingData(response.data);
          setEditableData(response.data); // Populate with data for editing
        } catch (err) {
          setError('Failed to load billing information');
        } finally {
          setLoading(false);
        }
      };

      fetchBillingData();
    } else {
      setError('No Billing ID found in session storage.');
    }
  }, [billingId]);

  // Handle change in input fields
  const handleChange = (field: keyof Billing, value: any) => {
    if (editableData) {
      const updatedData = {
        ...editableData,
        [field]: value,
      };
      if (field === 'medicinesCost' || field === 'consultationCost' || field === 'reportCost') {
        updatedData.totalCost = calculateTotalCost(updatedData); // Recalculate totalCost
      }

      setEditableData(updatedData);
      setEditableData(updatedData);
    }
  };

  // Calculate total cost dynamically based on the cost fields
  const calculateTotalCost = (data: Billing | null): number => {
    if (data) {
      const { medicinesCost, consultationCost, reportCost } = data;
      return (medicinesCost || 0) + (consultationCost || 0) + (reportCost || 0);
    }
    return 0;
  };

  // Handle the submission of the updated data
  const handleSubmit = async () => {
    if (!editableData) return;

    try {
      // Make a request to update the billing information
      await axios.put(`http://localhost:5000/api/billings/${billingId}`, editableData);
      alert('Billing information updated successfully!');
      // Optionally, navigate to another page or refresh the data
    } catch (err) {
      alert('Failed to update billing information');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      <AdminNavbar />

      <Container>
        <Typography variant="h4" gutterBottom align="center">
          View and Edit Bill
        </Typography>

        <Box component="form" sx={{ maxWidth: 600, margin: 'auto' }}>
          <TextField
            fullWidth
            label="Patient ID"
            value={billingData?.patientId}
            disabled
            margin="normal"
          />
          <TextField
            fullWidth
            label="Medicines"
            value={editableData?.medicines || ''}
            onChange={(e) => handleChange('medicines', e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Medicines Cost"
            type="number"
            value={editableData?.medicinesCost || ''}
            onChange={(e) => handleChange('medicinesCost', parseFloat(e.target.value))}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Consultation Cost"
            type="number"
            value={editableData?.consultationCost || ''}
            onChange={(e) => handleChange('consultationCost', parseFloat(e.target.value))}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Report ID"
            value={editableData?.reportId || ''}
            onChange={(e) => handleChange('reportId', e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Report Cost"
            type="number"
            value={editableData?.reportCost || ''}
            onChange={(e) => handleChange('reportCost', parseFloat(e.target.value))}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Due Date"
            type="date"
            value={editableData?.dueDate || ''}
            onChange={(e) => handleChange('dueDate', e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />

          {/* Total Cost Field */}
          <label htmlFor="">Total Cost</label>
          <TextField
            fullWidth
            value={editableData ? editableData.totalCost : '0.00'} // Show the calculated total cost
            onChange={(e) => handleChange('totalCost', parseFloat(e.target.value))} // Optionally, this field can also be editable, but it's disabled for now
            disabled
            margin="normal"
          />

          <Box sx={{ textAlign: 'center', marginTop: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit Changes
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default ViewBill;
