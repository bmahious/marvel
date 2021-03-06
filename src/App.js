import {HashRouter as Router, Route, Routes} from 'react-router-dom' 
import Header from './components/Header'
import Landing from './components/Landing'
import Footer from './components/Footer'
import Welcom from './components/Welcom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import ErrorPage from './components/ErrorPage'
import ForgetPassword from './components/ForgetPassword'
import './App.css';
import React from 'react'

class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }


  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/welcom" element={<Welcom/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
    </Router>
    )
  }
}

// function App() {
//   return (
//     <Router>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Landing />} />
//           <Route path="/welcom" element={<Welcom/>} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/forgetpassword" element={<ForgetPassword />} />
//           <Route path="*" element={<ErrorPage />} />
//         </Routes>
//         <Footer />
//     </Router>
//   );
// }

export default App;
