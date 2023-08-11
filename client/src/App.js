import './App.css';
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./style/globalStyle";
import { theme } from "./style/theme";
import SignupPage from './@pages/signupPage';
import SigninPage from './@pages/signinPage';
import TodoPage from './@pages/todoPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/signin' element={<SigninPage />} />
            <Route path='/todo' element={<TodoPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
    
  );
}

export default App;
