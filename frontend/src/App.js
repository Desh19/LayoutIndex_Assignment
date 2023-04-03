// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/views/Navbar';
import Footer from './components/views/Footer';


//device
import AddDevice from './components/views/Device/AddDevice';
import AllDevice from './components/views/Device/AllDevice';
import EditDevice from './components/views/Device/EditDevice';


//location
import  AddLocation  from './components/views/Location/AddLocation';
import LocationList from './components/views/Location/LocationList';
import EditLocation from './components/views/Location/EditLocation';
import SingleLocation from './components/views/Location/SingleLocation';

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route path='/' element={<AllDevice />} />
          <Route path='/deviceAdd' element={<AddDevice />} />
          <Route path='/deviceEdit/:id' element={<EditDevice />} />
          <Route path='/locationAdd' element={<AddLocation />} />
          <Route path='/locationList' element={<LocationList />} />
          <Route path='/locationEdit/:id' element={<EditLocation />} />
          <Route path='/singleLocation/:id' element={<SingleLocation />} />
        </Routes>  
      </Router>
      <Footer />
    </div>
  );
}

export default App;
