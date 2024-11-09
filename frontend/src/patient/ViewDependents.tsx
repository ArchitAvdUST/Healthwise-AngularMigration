import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface Dependent {
  id: string;
  name: string;
  sex: string;
  age: number;
  relationshipToPrimaryPatient: string;
}

const ViewDependents: React.FC = () => {
  const [dependents, setDependents] = useState<Dependent[]>([]);
  const [error, setError] = useState('');
  const [username, setusername] = useState('');

  useEffect(() => {
    const fetchDependents = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if(token){
            const decodedToken : {username: string} = jwtDecode(token);
            setusername(decodedToken.username);
        }
        const response = await axios.get(`http://localhost:5000/api/patients/dependents/${username}`);
        setDependents(response.data);
      } catch (err) {
        setError('Failed to load dependents');
      }
    };

    fetchDependents();
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        Dependents List
      </Typography>

      {error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Sex</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Relationship</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dependents.map((dependent) => (
                <TableRow key={dependent.id}>
                  <TableCell>{dependent.name}</TableCell>
                  <TableCell>{dependent.sex}</TableCell>
                  <TableCell>{dependent.age}</TableCell>
                  <TableCell>{dependent.relationshipToPrimaryPatient}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default ViewDependents;
