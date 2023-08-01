import './App.css';
import SignupPage from './@pages/signupPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/signup' element={<SignupPage />} />
        </Routes>
      </Router>
    </>
    
  );
}

export default App;
