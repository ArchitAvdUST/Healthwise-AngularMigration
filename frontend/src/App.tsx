import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './auth/SignUp';
import AdditionalInfo from './auth/AdditionalInfo';
import LandingPage from './LandingPage';
import Login from './auth/Login';
import PatientDashboard from './patient/PatientDashboard';
import AdminDashboard from './admin/AdminDashboard';
import DoctorDashboard from './doctor/DoctorDashboard';
import GetAppointments from './patient/GetAppointments';
import BookAppointment from './patient/BookAppointment';
import DoctorSelection from './patient/DoctorSelection';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> 

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/additional-info" element={<AdditionalInfo />} />

        <Route path='/patient/dashboard' element={<PatientDashboard />} />
        <Route path='/patient/appointments' element={<GetAppointments />} />
        <Route path='/patient/book-appointment' element={<BookAppointment />} />
        <Route path='/patient/doctor-selection' element={<DoctorSelection />} />

        <Route path='admin/dashboard' element={<AdminDashboard />} />

        <Route path='/doctor/dashboard' element={<DoctorDashboard />} />

      </Routes>
    </Router>
  );
};

export default App;