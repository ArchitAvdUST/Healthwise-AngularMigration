import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const ViewMedicalHistory: React.FC = () => {
  const [medicalHistory, setMedicalHistory] = useState<any[]>([]);

  /* useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const response = await axios.get('/api/medical-history'); // Update with your API endpoint
        setMedicalHistory(response.data);
      } catch (error) {
        console.error('Error fetching medical history:', error);
      }
    };

    fetchMedicalHistory();
  }, []);
   */
  return (
    <Container>
      <Typography variant="h4" gutterBottom>View Medical History</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicalHistory.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ViewMedicalHistory;
