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
import ViewBill from './admin/ViewBill';
//doctorEndpoints
import DoctorDashboard from './doctor/DoctorDashboard';
import GenerateReports from './doctor/GenerateReports';
import ViewAppointments from './doctor/ViewAppointments';
import ViewMedicalHistory from './doctor/ViewMedicalHistory';
import ManageAppointments from './doctor/ManageAppointments';
import DoctorActions from './doctor/DoctorActions';
import SetTimings from './doctor/SetTimings';
//patientendpoints
import GetAppointments from './patient/GetAppointments';
import BookAppointment from './patient/BookAppointment';
import DoctorSelection from './patient/DoctorSelection';
import ChooseAppointment from './patient/ChooseAppointment';
import GetHistory from './patient/GetHistory';
import UpdateDetails from './patient/UpdateProfile';
import SeeBill from './patient/Seebill';
import ShowBill from './patient/showBill';
//pharmacyendpoints
import PharmacyDashboard from './pharmacy/pd';
import ViewStocks from './pharmacy/ViewStocks';
import AddStocks from './pharmacy/Addstocks';
import Dependent from './patient/Dependent';
import AddDependents from './patient/AddDependents';
import ViewDependents from './patient/ViewDependents';

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
          <Route path='/patient/showBill' element={<ShowBill/>} />
          <Route path='/patient/Seebill'  element={<SeeBill/>} />
          <Route path='/patient/dependent' element={<Dependent />} />
          <Route path='/patient/add-dependents' element={<AddDependents />} />
          <Route path='/patient/view-dependents' element={<ViewDependents />} />

          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path="/admin/add-doctors" element={<AddDoctors />} />
          <Route path="/admin/delete-doctors" element={<DeleteDoctors/>} />
          <Route path="/admin/view-reviews" element ={<ViewReviews/>} />
          <Route path="/admin/generate-bills" element={<GenerateBills />} />
          <Route path="/admin/view-bills" element={<ViewBill/>} />

          <Route path='/doctor/dashboard' element={<DoctorDashboard />} />
          <Route path="/doctor/view-appointments" element={<ViewAppointments />} />
          <Route path="/doctor/manage-appointments" element={<ManageAppointments />} />
          <Route path="/doctor/view-medical-history" element={<ViewMedicalHistory />} />
          <Route path="/doctor/generate-reports" element={<GenerateReports />} />
          <Route path="/doctor/actions" element={<DoctorActions />}   />
          <Route path='/doctor/set-timings' element={<SetTimings />} />

          <Route path='/pharmacy/dashboard' element={< PharmacyDashboard/>} />
          <Route path='/pharmacy/viewstocks' element={<ViewStocks/>} />
          <Route path='/pharmacy/addstocks' element={<AddStocks/>} />

        </Routes>
      </Router>
    
  );
};

export default App;