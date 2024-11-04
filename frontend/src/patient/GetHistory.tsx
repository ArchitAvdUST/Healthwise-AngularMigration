import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import axios from 'axios';
import PatientNavbar from './components/PatientNavbar'; // Assuming Navbar is in the same directory
import { jwtDecode } from 'jwt-decode';

interface HistoryItem {
  date: string;
  time: string;
  doctorUserName: string;
  symptoms: string;
}

const GetHistory: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [patientHistory, setPatientHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    // Fetch history data from API
    const fetchHistory = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error("Token not found in session storage");
        }
        const decodedToken: { username: string } = jwtDecode(token);
        const username = decodedToken.username; // Retrieve token from local storage
        const response = await axios.get(`http://localhost:5000/api/histories/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in Authorization header
          },
        });
        setPatientHistory(response.data);
      } catch (error) {
        console.error('Error fetching history data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <>
      <PatientNavbar />

      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Medical History
        </Typography>

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
      </Box>
    </>
  );
};

export default GetHistory;
