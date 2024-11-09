import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import PatientNavbar from './components/PatientNavbar';


const Dependent = () => {
    const navigate = useNavigate();
    return (
        <>
        <PatientNavbar />
        <Container maxWidth="sm" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Dependents
          </Typography>
    
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/patients/add-dependents')}
            style={{ marginRight: '1rem' }}
          >
            Add Dependents
          </Button>
    
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/patients/view-dependents')}
          >
            View Dependents
          </Button>
        </Container>
        </>
      );
    };

export default Dependent