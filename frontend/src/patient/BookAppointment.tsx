import React, { useState } from 'react';
import axios from 'axios';
import { Box, Container, Typography, FormControl, InputLabel, Select, MenuItem, Button, TextField, SelectChangeEvent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/PatientNavbar';

const BookAppointment: React.FC = () => {
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [customSymptom, setCustomSymptom] = useState('');
  const navigate = useNavigate();

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
      const token = sessionStorage.getItem('token');
      const symptomsToUpdate = selectedSymptom === 'Other' ? customSymptom : selectedSymptom;

      // Update the patient's symptoms
      await axios.put('/api/patient/update-symptoms', { symptoms: symptomsToUpdate }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Redirect to doctor selection page
      navigate('/select-doctor');
    } catch (error) {
      console.error('Error updating symptoms:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Box mt={4} p={3} boxShadow={3} borderRadius="8px" bgcolor="#f9f9f9" textAlign="center" maxWidth="sm" mx="auto">
          <Typography variant="h5" color="primary" gutterBottom>
            Book an Appointment
          </Typography>
          
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
              <MenuItem value="Other">Other</MenuItem> {/* Other option */}
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
            color="primary" 
            onClick={handleSubmit} 
            sx={{ mt: 3 }}
            disabled={!selectedSymptom || (selectedSymptom === 'Other' && !customSymptom)} // Disable button until a symptom is selected or custom symptom is entered
          >
            Proceed to Select Doctor
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default BookAppointment;
