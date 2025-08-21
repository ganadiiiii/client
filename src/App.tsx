import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';


function App() {
  return (
    <Router>
      <div className="bg-[#FCFBF6] min-h-[1800px]">
        <Navbar />
        <main className="pt-[579px]">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
          </Routes>
        </main>
        <footer className="w-full h-[200px] bg-[#EDEDED]"></footer>
      </div>
    </Router>
  );
}

export default App;
