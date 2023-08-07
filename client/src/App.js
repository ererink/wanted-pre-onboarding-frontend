import './App.css';
import SignupPage from './@pages/signupPage';
import SigninPage from './@pages/signinPage';
import TodoPage from './@pages/todoPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/signin' element={<SigninPage />} />
          <Route path='/todo' element={<TodoPage />} />
        </Routes>
      </Router>
    </>
    
  );
}

export default App;
