import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import CustomizingPage from './pages/CustomizingPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/customizing" 
          element={
            <div>
              <Navbar />
              <CustomizingPage />
            </div>
          } 
        />
        <Route 
          path="/*" 
          element={
            <div className="bg-[#FCFBF6] min-h-[1800px]">
              <Navbar />
              <main className="pt-[579px]">
                <Routes>
                  <Route path="/" element={<LoginForm />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/signup" element={<SignUpForm />} />
                </Routes>
              </main>
              <footer className="w-full h-[200px] bg-[#EDEDED]"></footer>
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
