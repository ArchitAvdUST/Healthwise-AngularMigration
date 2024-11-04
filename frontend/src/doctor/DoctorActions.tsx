import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Alert,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import Autocomplete from '@mui/lab/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DoctorNavbar from './components/DoctorNavbar';

interface Appointment {
  id: string;
  date: string;
  time: string;
  patientId: string;
  doctorUserName: string;
  isCompleted: boolean;
  symptoms: string;
}

interface HistoryItem {
  date: string;
  time: string;
  doctorUserName: string;
  symptoms: string;
}

const ActionDoctor: React.FC = () => {
  const [patientHistory, setPatientHistory] = useState<HistoryItem[]>([]); // Initialize as empty array
  const [medicines, setMedicines] = useState<{ id: number; name: string; price: number }[]>([]);
  const [selectedMedicine, setSelectedMedicine] = useState<{ id: number; name: string; price: number } | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [appointmentCompleted, setAppointmentCompleted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const appointmentId = sessionStorage.getItem('appointmentId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      if (!appointmentId) {
        setError('No appointment ID found in session storage.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/appointments/get/${appointmentId}`);
        setAppointment(response.data);
        return response.data; // Return appointment data to be used later
      } catch (err) {
        console.error('Error fetching appointment details:', err);
        setError('Failed to fetch appointment details.');
        return null; // Return null if there was an error
      }
    };

    const fetchPatientHistory = async (appointmentData: { patientId: any; }) => {
      console.log("Inside patient history");

      try {
        const response = await axios.get(`http://localhost:5000/api/histories/${appointmentData.patientId}`);
        setPatientHistory(response.data);
        console.log(patientHistory);
      } catch (err) {
        console.error('Error fetching patient history:', err);
        setError('Failed to fetch patient history.');
      }
    };

    const fetchMedicines = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pharmacies');
        setMedicines(response.data);
      } catch (err) {
        console.error('Error fetching medicines:', err);
        setError('Failed to fetch medicines.');
      }
    };

    const fetchData = async () => {
      const appointmentData = await fetchAppointmentDetails(); // Wait for appointment details to be fetched
      if (appointmentData) {
        // Only fetch patient history if appointment details were retrieved successfully
        await fetchPatientHistory(appointmentData);
      }
    };

    fetchData(); // Call the combined fetch function
    fetchMedicines();
  }, [appointmentId]);

  const handleCompleteAppointment = async () => {
    if (!appointmentId) return;

    try {
      await axios.put(`http://localhost:5000/api/appointments/${appointmentId}`, {
        isCompleted: true,
      });
      setAppointmentCompleted(true);
    } catch (err) {
      console.error('Error marking appointment as completed:', err);
      setError('Failed to mark appointment as completed.');
    }
  };

  const handleSubmit = async () => {
    if (!selectedMedicine) return;

    try {
      await axios.post('http://localhost:5000/api/billings', {
        patientId: appointment?.patientId,
        appointmentId: appointmentId,
        medicines: selectedMedicine.name,
        medicinesCost: selectedMedicine.price,
      });
      await axios.post(`http://localhost:5000/api/histories/add/${appointment?.patientId}`, {
        date: appointment?.date,              
        time: appointment?.time,              
        doctorUserName: appointment?.doctorUserName, 
        symptoms: appointment?.symptoms       
      });      
      setSnackbarOpen(true);
      sessionStorage.removeItem('appointmentId');
      setTimeout(() => {
        navigate('/doctor/manage-appointments'); // Change this to your desired route
      }, 1000);
    } catch (err) {
      console.error('Error submitting prescription:', err);
      setError('Failed to submit prescription.');
    }
  };

  return (
    <>
      <DoctorNavbar />
      <Container sx={{ padding: 4 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <Typography variant="h5" mb={2}>Patient Actions</Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Patient History */}
          <Grid item xs={4}>
            <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2, backgroundColor: 'white' }}>
              <Typography variant="h6">Patient History</Typography>
              {/* Check if patientHistory is not empty */}
              {patientHistory && patientHistory.length > 0 ? (
                patientHistory.map((historyItem, index) => (
                  <div key={index} style={{ marginBottom: '16px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}>
                    <div style={{ fontWeight: 'bold' }}>{`Date: ${historyItem.date}`}</div>
                    <div style={{ fontWeight: 'bold' }}>{`Time: ${historyItem.time}`}</div>
                    <div style={{ fontWeight: 'bold' }}>{`Doctor: ${historyItem.doctorUserName}`}</div>
                    <div>{`Symptoms: ${historyItem.symptoms}`}</div>
                  </div>
                ))
              ) : (
                <div>No history available.</div>
              )}
            </Box>
          </Grid>


          {/* Prescription Input */}
          <Grid item xs={4}>
            <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2, backgroundColor: 'white' }}>
              <Typography variant="h6">Prescription</Typography>
              <Autocomplete
                options={medicines}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => {
                  setSelectedMedicine(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Select Medicine" variant="outlined" />}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
              {selectedMedicine && (
                <Typography variant="body1">
                  Selected Medicine: {selectedMedicine.name}
                </Typography>
              )}
            </Box>
          </Grid>

          {/* Appointment Completion */}
          <Grid item xs={4}>
            <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2, backgroundColor: 'white' }}>
              <Typography variant="h6">Complete Appointment</Typography>
              <Button
                variant="contained"
                color={appointmentCompleted ? "success" : "error"}
                onClick={handleCompleteAppointment}
                sx={{ mb: 2 }}
              >
                {appointmentCompleted ? "Completed" : "Mark as Completed"}
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Submit Button Centered */}
        <Box display="flex" justifyContent="center" marginTop={4}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
          >
            Submit Changes
          </Button>
        </Box>

        {/* Snackbar for success message */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message="Prescription submitted successfully!"
        />
      </Container>
    </>
  );
};

export default ActionDoctor;
