import './App.css'
import Button from './components/Button.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PaginaPrincipal from './components/PaginaPrincipal.jsx'
import ClientHome from './components/ClientHome.jsx'
import ClientRegister from './components/ClientRegister.jsx'
import ClientLogin from './components/ClientLogin.jsx'
import ClientLogged from './components/ClientLogged.jsx'
import MakingReservation from './components/MakingReservation.jsx'
import ClientReservations from './components/ClientReservations.jsx'
import AdminSection from './components/AdminSection.jsx'
import AdminRack from './components/AdminRack.jsx'
import RevenueReport from './components/RevenueReport.jsx'


function App() {
  return (
    <Router>
      <div className = "container">
        <Routes>  
          <Route path="/" element={<PaginaPrincipal/>} />
          <Route path="/ClientHome" element={<ClientHome/>} />
          <Route path="/ClientRegister" element={<ClientRegister/>} />
          <Route path ="ClientLogin" element={<ClientLogin/>}/>
          <Route path="/ClientLogged" element={<ClientLogged/>} />
          <Route path="/ClientLogged/MakingReservations" element={<MakingReservation/>} />
          <Route path="/ClientLogged/Reservations" element={<ClientReservations/>} />
          
          <Route path="/Admin" element={<AdminSection/>} />
          <Route path = "/Admin/Rack" element = {<AdminRack/>}/>
          <Route path="/Admin/RevenueReport" element={<RevenueReport/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App
