import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface Slot {
  start: string;
  end: string;
  isAvailable: boolean;
  _id: string;
}

interface Timing {
  _id: string;
  doctorId: string;
  date: string;
  slots: Slot[];
}

const AppointmentBooking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctorId, setdoctorId] = useState<string>('');
  const test = 'doctor';
  const [timings, setTimings] = useState<Timing[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [slotStart, setslotStart] = useState<string|null>(null);
  const [slotEnd, setslotEnd] = useState<string|null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [username, setusername] = useState<string>('');
  const [symptom, setsymptom] = useState<string>('');

  // Fetch all timings (dates, available slots, and booked slots) for the doctor
  useEffect(() => {
    const fetchTimings = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if(token){
        const decodedToken: { username: string } = jwtDecode(token);
        const tokenusername = decodedToken.username;
        setusername(tokenusername);
        }
        const Patientsymptom = sessionStorage.getItem('symptom');
        if(Patientsymptom){
        setsymptom(Patientsymptom);
        }
        const DoctorUserName = sessionStorage.getItem('doctorUserName');
        if(DoctorUserName){
          setdoctorId(DoctorUserName);
        }
        const response = await axios.get(`http://localhost:5000/api/timings/doctor/${test}`);
        setTimings(response.data);
      } catch (error) {
        console.error("Error fetching timings", error);
      }
    };

    fetchTimings();
  }, [doctorId]);

  // Handle date selection and filter slots for that date
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    const selectedTiming = timings.find((timing) => timing.date === date);
    setAvailableSlots(selectedTiming ? selectedTiming.slots.filter((slot) => slot.isAvailable) : []);
  };

  const handleSlotSelect = (slotId: string, slotStart: string, slotEnd: string) => {
    setSelectedSlot(slotId);
    setslotStart(slotStart);
    setslotEnd(slotEnd);
    setConfirmationOpen(true); // Open confirmation dialog
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  const confirmAppointment = async () => {
    if (selectedDate && selectedSlot) {
      const appointmentDate = formatDate(selectedDate); // or just use selectedDate if it is already in string format
      const appointmentTime = `${formatDate(selectedDate!)} at ${ slotStart? formatTime(slotStart): slotStart} to  ${ slotEnd? formatTime(slotEnd): slotEnd}`; // Combine start and end times if needed
      try {
        console.log(doctorId);
        await axios.post('http://localhost:5000/api/appointments', {
          doctorUserName: doctorId,
          patientId: username,
          date: appointmentDate, // Send as a formatted string
        time: appointmentTime, // Send as a formatted string
          isCompleted: false,
          symptoms: symptom
        });
        setSnackbarMessage("Appointment confirmed!");
        setSnackbarOpen(true);
        setConfirmationOpen(false);
        setAvailableSlots((prevSlots) =>
          prevSlots.map((slot) =>
            slot._id === selectedSlot ? { ...slot, isAvailable: false } : slot
          )
        );

        // Redirect to another page or confirmation screen
        setTimeout(() => {
          navigate('/patient/dashboard');
        }, 3000);
      } catch (error) {
        console.error("Error confirming appointment", error);
        setSnackbarMessage("Error booking appointment. Please try again.");
        setSnackbarOpen(true);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Book an Appointment 
        </Typography>

        {/* Available Dates */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          Select a Date:
        </Typography>
        <List>
          {timings.map((timing) => (
            <ListItem key={timing.date} disablePadding>
              <ListItemButton onClick={() => handleDateSelect(timing.date)}>
                {formatDate(timing.date)}
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Available and Booked Time Slots */}
        {selectedDate && (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Available Slots for {formatDate(selectedDate)}:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {availableSlots.length > 0 ? (
                availableSlots.map((slot) => (
                  <Button
                    key={slot._id}
                    variant="outlined"
                    onClick={() => handleSlotSelect(slot._id, slot.start,slot.end)}
                    sx={{ minWidth: 100 }}
                  >
                    {`${formatTime(slot.start)} - ${formatTime(slot.end)}`}
                  </Button>
                ))
              ) : (
                <Typography>No available slots for this date.</Typography>
              )}
            </Box>
          </>
        )}
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
        <DialogTitle>Confirm Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to book an appointment on {formatDate(selectedDate!)} at { slotStart? formatTime(slotStart): slotStart} to  { slotEnd? formatTime(slotEnd): slotEnd}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationOpen(false)}>Cancel</Button>
          <Button onClick={confirmAppointment} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AppointmentBooking;
