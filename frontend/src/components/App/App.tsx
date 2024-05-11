import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import HomePage from '../HomePage/HomePage';
import NavigationMenu from '../Navbar/Navbar';
import { Helmet } from 'react-helmet';
import Dashboard from '../Dashboard/Dashboard';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import DogcosmeticsTraining from '../DogcosmeticsTraining/DogcosmeticsTraining';
import Customers from '../Customers/Customers';
import ResponsiveAppBar from '../ResponsiveAppBar/ResponsiveAppBar';
import Profil from '../Profil/Profil';
import Services from '../Services/Services';
import ServicesToCustomers from '../ServicesToCustomers/ServicesToCustomers';
import ApplicationManagement from '../ApplicationManagement/ApplicationManagement';
import DogManagement from '../DogManagment/DogManagment';
import DogForm from '../DogForm/DogForm';
import Appointment from '../Appointment/Appointment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';


function App() {
  const  userId  = '663219e5d704b104f3e11f7b';

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="App">
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"        />
      </Helmet>
      <Router>
        <ResponsiveAppBar />
        <UserContext.Provider value={{ userId }}>
        <Routes>
          <Route path="/dogcosmetics-training" element={<DogcosmeticsTraining />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/dogs" element={<DogManagement />} />
          <Route path="/dog" element={<DogForm userId={userId} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/applications" element={<ApplicationManagement />} />
          <Route path="/servicestocustomers" element={<ServicesToCustomers />} />
          <Route path='/bookappointment' element={<Appointment />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/user/:id" element={<Profil />} />
        </Routes>
        </UserContext.Provider>
      </Router>
    </div>
    </LocalizationProvider>
  );
}

export default App;
