import React, { useState, useEffect } from 'react';
import { Box, Button, Container, TextField, Typography, Snackbar } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/PatientNavbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface TimeSlot {
  time: string;
  selected: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ChooseAppointment: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const doctorId = location.state?.doctorId; // Get doctor ID from previous page state

  const fetchAvailableSlots = async (date: string) => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.get(`/api/availability?date=${date}&doctorId=${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const slots: TimeSlot[] = response.data.map((time: string) => ({ time, selected: false }));
      setTimeSlots(slots);
    } catch (error) {
      console.error('Error fetching time slots:', error);
      setErrorMessage('Error fetching time slots. Please try again.');
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
      fetchAvailableSlots(formattedDate);
    }
  };

  const handleSlotClick = (slot: TimeSlot) => {
    setSelectedSlot(slot.selected ? null : slot);
  };

  const handleConfirmAppointment = async () => {
    if (!selectedSlot || !selectedDate) return;

    const appointmentData = {
      doctorId,
      date: selectedDate.toISOString().split('T')[0], // Format date
      time: selectedSlot.time,
    };

    try {
      await axios.post('/api/appointments', appointmentData);

      // Update availability by removing the selected time slot
      await axios.post(`/api/update-availability`, { doctorId, time: selectedSlot.time });

      setSuccessMessage('Appointment booked successfully!');
      setConfirmationOpen(true);
      navigate('/patient-dashboard'); // Navigate to the patient dashboard after successful booking
    } catch (error) {
      console.error('Error booking appointment:', error);
      setErrorMessage('Error booking appointment. Please try again.');
    }
  };

  const handleCloseSnackbar = () => {
    setConfirmationOpen(false);
    setErrorMessage('');
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Typography variant="h4" color="primary" gutterBottom textAlign="center" mt={4}>
          Choose an Appointment Date
        </Typography>
        
        <Box display="flex" justifyContent="center" mb={4}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
            // No need for renderInput here
            // The DatePicker automatically renders a TextField internally
            // If you want to use a custom TextField, you can use the inputFormat prop
          />
        </Box>

        {timeSlots.length > 0 && (
          <Box>
            <Typography variant="h5" color="primary" gutterBottom textAlign="center">
              Available Time Slots
            </Typography>
            <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
              {timeSlots.map((slot) => (
                <Button
                  key={slot.time}
                  variant={slot.selected ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => handleSlotClick(slot)}
                  sx={{ width: '100px' }}
                >
                  {slot.time}
                </Button>
              ))}
            </Box>
          </Box>
        )}

        {selectedSlot && (
          <Box mt={4} textAlign="center">
            <Typography variant="h6">
              You have selected: {selectedSlot.time} on {selectedDate?.toLocaleDateString()}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleConfirmAppointment} sx={{ mt: 2 }}>
              Confirm Appointment
            </Button>
          </Box>
        )}

        {/* Success and Error Messages */}
        <Snackbar open={confirmationOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>

        <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default ChooseAppointment;
