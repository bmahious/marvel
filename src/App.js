import {BrowserRouter as Router, Route, Routes} from 'react-router-dom' 
import Header from './components/Header'
import Landing from './components/Landing'
import Footer from './components/Footer'
import Welcom from './components/Welcom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import ErrorPage from './components/ErrorPage'
import './App.css';

function App() {
  return (
    <Router>

        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/welcome" element={<Welcom/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />

    </Router>
  );
}

export default App;
