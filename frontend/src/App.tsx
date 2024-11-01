import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './auth/SignUp';
import AdditionalInfo from './auth/AdditionalInfo';
import LandingPage from './LandingPage';
import Login from './auth/Login';
import PatientDashboard from './patient/PatientDashboard';


//adminEndpoints
import AdminDashboard from './admin/AdminDashboard';
import AddDoctors  from './admin/AddDoctor';
import ViewReviews from './admin/ViewReviews'
import GenerateBills from './admin/GenerateBill';
import  DeleteDoctors from './admin/DeleteDoctors';
//doctorEndpoints
import DoctorDashboard from './doctor/DoctorDashboard';
import GenerateReports from './doctor/GenerateReports';
import ViewAppointments from './doctor/ViewAppointments';
import ViewMedicalHistory from './doctor/ViewMedicalHistory';
import ManageAppointments from './doctor/ManageAppointments';


import GetAppointments from './patient/GetAppointments';
import BookAppointment from './patient/BookAppointment';
import DoctorSelection from './patient/DoctorSelection';
import ChooseAppointment from './patient/ChooseAppointment';
import GetHistory from './patient/GetHistory';
import UpdateDetails from './patient/UpdateProfile';

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
          <Route path='/patient/choose-appointment' element={<ChooseAppointment />} />
          <Route path='/patient/get-history' element= {<GetHistory />} />
          <Route path='/patient/update-profile' element={<UpdateDetails />} />

          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path="/admin/add-doctors" element={<AddDoctors />} />
          <Route path="/admin/delete-doctors" element={<DeleteDoctors/>} />
          <Route path="/admin/view-reviews" element ={<ViewReviews/>} />
          <Route path="/admin/generate-bills" element={<GenerateBills />} />

          <Route path='/doctor/dashboard' element={<DoctorDashboard />} />
          <Route path="/doctor/view-appointments" element={<ViewAppointments />} />
          <Route path="/doctor/manage-appointments" element={<ManageAppointments />} />
          <Route path="/doctor/view-medical-history" element={<ViewMedicalHistory />} />
          <Route path="/doctor/generate-reports" element={<GenerateReports />} />

        </Routes>
      </Router>
    
  );
};

export default App;