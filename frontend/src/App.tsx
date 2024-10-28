import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './auth/SignUp';
import AdditionalInfo from './auth/AdditionalInfo';
import LandingPage from './LandingPage';
import Login from './auth/Login';
import PatientDashboard from './patient/PatientDashboard';
import AdminDashboard from './admin/AdminDashboard';
import DoctorDashboard from './doctor/DoctorDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/additional-info" element={<AdditionalInfo />} />
        <Route path='/patient-dashboard' element={<PatientDashboard />} />
        <Route path='admin-dashboard' element={<AdminDashboard />} />
        <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
        {/*<Route path="/patient-dashboard" element={<PatientDashboard />} />*/}

      </Routes>
    </Router>
  );
};

export default App;
