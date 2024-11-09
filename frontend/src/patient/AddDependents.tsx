import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AddDependents: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [sex, setSex] = useState('');
  const [relationship, setRelationship] = useState('');
  const [primaryEmail, setPrimaryEmail] = useState('');
  const [primaryPhone, setPrimaryPhone] = useState('');
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchPrimaryPatientDetails = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (token) {
          const decodedToken: { username: string } = jwtDecode(token);
          setUsername(decodedToken.username);
          const response = await axios.get(`http://localhost:5000/api/patients/${username}`);
          setPrimaryEmail(response.data.email);
          setPrimaryPhone(response.data.phone);
        }
      } catch (error) {
        setMessage('Failed to load primary patient details');
      }
    };

    fetchPrimaryPatientDetails();
  }, []);

  const handleAddDependent = async () => {
    try {
      const primaryPatientUsername = username;
      const newUsername = primaryPatientUsername+'_'+relationship;
      const newDependent = { name, age, sex, relationship,email: primaryEmail, phone: primaryPhone, primaryPatientUsername, username: newUsername };

      // Send POST request to add dependent
      const response = await axios.post('http://localhost:5000/api/patients', newDependent);
      setMessage(response.data.message || 'Dependent added successfully');

      // Clear the form
      setName('');
      setAge('');
      setSex('');
      setRelationship('');
    } catch (error) {
      setMessage('Failed to add dependent');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        Add Dependent
      </Typography>

      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Age"
        type="number"
        fullWidth
        margin="normal"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />
      <TextField
        label="Sex"
        fullWidth
        margin="normal"
        value={sex}
        onChange={(e) => setSex(e.target.value)}
      />
      <TextField
        label="Relationship"
        fullWidth
        margin="normal"
        value={relationship}
        onChange={(e) => setRelationship(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddDependent}
        style={{ marginTop: '1rem' }}
      >
        Add Dependent
      </Button>

      {message && <Typography color="primary" style={{ marginTop: '1rem' }}>{message}</Typography>}
    </Container>
  );
};

export default AddDependents;
