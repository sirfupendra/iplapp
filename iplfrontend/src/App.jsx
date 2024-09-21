// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './auth/Register';
import Protected from './auth/Protected';
import Login from './auth/Login';
import Dashboard from './maincontent/Dashboard';
import PrivateRoute from './auth/PrivateRoute';
import Landingpage from './pages/Landingpage';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/protected" 
            element={
              <PrivateRoute>
                <Protected />
              </PrivateRoute>
            } 
          />

          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
