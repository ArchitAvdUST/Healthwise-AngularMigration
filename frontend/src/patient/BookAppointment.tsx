import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Typography, FormControl, InputLabel, Select, MenuItem, Button, TextField, SelectChangeEvent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/PatientNavbar';
import { jwtDecode } from 'jwt-decode';

interface Patient {
  username: string;
  name: string;
  relationshipToPrimaryPatient: string;
  primaryPatientUsername: string;
}

const BookAppointment: React.FC = () => {
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [customSymptom, setCustomSymptom] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPrimaryPatient, setSelectedPrimaryPatient] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch patients from the backend
    const fetchPatients = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error("Token not found in session storage");
        }
        const decodedToken: { username: string } = jwtDecode(token);
        await setUsername(decodedToken.username);
        const response = await axios.get(`http://localhost:5000/api/patients/dependents/${username}`);
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, [username]);

  const handleChange = (event: { target: { value: string; }; }) => {
    setSelectedPrimaryPatient(event.target.value as string);
  };

  const handleSymptomChange = (event: SelectChangeEvent<string>) => {
    setSelectedSymptom(event.target.value);
    if (event.target.value !== 'Other') {
      setCustomSymptom(''); // Reset custom symptom if a predefined symptom is selected
    }
  };

  const handleCustomSymptomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomSymptom(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const symptomsToUpdate = selectedSymptom === 'Other' ? customSymptom : selectedSymptom;
      sessionStorage.setItem('symptom', symptomsToUpdate);
      sessionStorage.setItem('username',selectedPrimaryPatient);


      // Redirect to doctor selection page
      navigate('/patient/doctor-selection');
    } catch (error) {
      console.error('Error updating symptoms:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Box
          mt={4}
          p={3}
          boxShadow={3}
          borderRadius="8px"
          bgcolor="#f9f9f9"
          textAlign="center"
          maxWidth="sm"
          mx="auto"
          sx={{
            transition: 'box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.5)', // Darker shadow on hover
              bgcolor: '#e0e0e0', // Light grey background on hover
            },
          }}
        >
          <Typography variant="h5" color="primary" gutterBottom>
            Book an Appointment
          </Typography>
          <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
            <InputLabel id="select-primary-patient-label">For whom should we book the appointment</InputLabel>
            <Select
              labelId="select-primary-patient-label"
              value={selectedPrimaryPatient}
              onChange={handleChange}
              label="Primary Patient"
            >
              <MenuItem value={username}> Myself </MenuItem>
              {patients
                .filter(patient => patient.primaryPatientUsername) // Show only dependent patients
                .map((patient) => (
                  <MenuItem key={patient.username} value={patient.username}>
                    {patient.name} - {patient.relationshipToPrimaryPatient}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
            <InputLabel id="symptom-select-label">Select Your Symptoms</InputLabel>
            <Select
              labelId="symptom-select-label"
              value={selectedSymptom}
              onChange={handleSymptomChange}
              label="Select Your Symptoms"
            >
              <MenuItem value="Fever">Fever</MenuItem>
              <MenuItem value="Cold">Cold</MenuItem>
              <MenuItem value="Headache">Headache</MenuItem>
              <MenuItem value="Stomach Pain">Stomach Pain</MenuItem>
              <MenuItem value="Body Ache">Body Ache</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          {/* TextField for custom symptom input */}
          {selectedSymptom === 'Other' && (
            <TextField
              variant="outlined"
              label="Please specify your symptom"
              value={customSymptom}
              onChange={handleCustomSymptomChange}
              fullWidth
              sx={{ mt: 2 }}
            />
          )}

          <Button
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: 'darkblue', // Dark blue background
              color: 'white', // White text color
              '&:hover': {
                bgcolor: 'blue', // Change to a lighter blue on hover
              },
            }}
            onClick={handleSubmit}
            disabled={!selectedSymptom || !selectedPrimaryPatient ||  (selectedSymptom === 'Other' && !customSymptom)} // Disable button until a symptom is selected or custom symptom is entered
          >
            Proceed to Select Doctor
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default BookAppointment;
