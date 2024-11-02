import React, { useState, useEffect } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Typography, Container, Grid, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';

const ActionDoctor: React.FC = () => {
  const [patientHistory, setPatientHistory] = useState<string | null>(null);
  const [medicines, setMedicines] = useState<{ id: number; name: string; selected: boolean }[]>([]);
  const [appointmentCompleted, setAppointmentCompleted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patient-history'); // Adjust endpoint
        setPatientHistory(response.data.history);
      } catch (err) {
        console.error('Error fetching patient history:', err);
        setError('Failed to fetch patient history.');
      }
    };

    const fetchMedicines = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/medicines'); // Adjust endpoint
        const fetchedMedicines = response.data.map((med: { id: number; name: string }) => ({
          ...med,
          selected: false,
        }));
        setMedicines(fetchedMedicines);
      } catch (err) {
        console.error('Error fetching medicines:', err);
        setError('Failed to fetch medicines.');
      }
    };

    fetchPatientHistory();
    fetchMedicines();
    setLoading(false);
  }, []);

  const handleMedicineChange = (id: number) => {
    setMedicines(medicines.map(medicine =>
      medicine.id === id ? { ...medicine, selected: !medicine.selected } : medicine
    ));
  };

  const handleCompleteAppointment = async () => {
    try {
      await axios.patch('http://localhost:5000/api/appointments/mark-completed', {
        completed: true,
      });
      setAppointmentCompleted(true);
    } catch (err) {
      console.error('Error marking appointment as completed:', err);
      setError('Failed to mark appointment as completed.');
    }
  };

  const handleSubmit = async () => {
    const prescribedMedicines = medicines.filter(medicine => medicine.selected);
    try {
      await axios.post('http://localhost:5000/api/prescriptions', { prescribedMedicines });
      console.log("Saving changes:", { prescribedMedicines, appointmentCompleted });
    } catch (err) {
      console.error('Error submitting prescription:', err);
      setError('Failed to submit prescription.');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container sx={{ padding: 4 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <Typography variant="h5" mb={2}>Patient Actions</Typography>
      <Grid container spacing={4} justifyContent="center">
        {/* Patient History */}
        <Grid item xs={4}>
          <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2, backgroundColor: 'white' }}>
            <Typography variant="h6">Patient History</Typography>
            <Typography>{patientHistory || "No history available."}</Typography>
          </Box>
        </Grid>

        {/* Prescription Input */}
        <Grid item xs={4}>
          <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2, backgroundColor: 'white' }}>
            <Typography variant="h6">Prescription</Typography>
            {medicines.map(medicine => (
              <FormControlLabel
                key={medicine.id}
                control={
                  <Checkbox
                    checked={medicine.selected}
                    onChange={() => handleMedicineChange(medicine.id)}
                  />
                }
                label={medicine.name}
              />
            ))}
          </Box>
        </Grid>

        {/* Appointment Completion */}
        <Grid item xs={4}>
          <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2, backgroundColor: 'white' }}>
            <Typography variant="h6">Complete Appointment</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCompleteAppointment}
              sx={{ mb: 2 }}
            >
              Mark as Completed
            </Button>
            {appointmentCompleted && <Typography color="green">Appointment marked as completed!</Typography>}
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
    </Container>
  );
};

export default ActionDoctor;
