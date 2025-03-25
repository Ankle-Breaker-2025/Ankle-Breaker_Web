import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import About from './components/About/About.jsx';
import Team from './components/Team/Team.jsx';
import Training from './components/Training/Training.jsx';
import Store from './components/Store/Store.jsx';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import PickUp from './components/PickUp/PickUp.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/team" element={<Team/>}/>
        <Route path="/training" element={<Training/>}/>
        <Route path="/store" element={<Store/>}/>
        <Route path="/pickup" element={<PickUp/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
