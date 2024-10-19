// App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./auth/Register";
import Protected from "./auth/Protected";
import Login from "./auth/Login";
import Dashboard from "./maincontent/Dashboard";
import PrivateRoute from "./auth/PrivateRoute";
import Landingpage from "./pages/Landingpage";
import { AuthProvider } from "./auth/AuthContext";
import Board from "./pages/Board";
import PlayerDetail from "./pages/PlayerDetails";
import Header from "./components/Header";

function App() {
  return (
    <main>
      
      <Router>
        <AuthProvider>
        <Header/>
          <Routes>
          
           
            <Route element={<PrivateRoute protect={false} />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Landingpage />} />
            </Route>

            
            <Route element={<PrivateRoute protect={true} />}>
              <Route path="/dashboard" element={<Board />} />
              <Route path="/dashboard/player/:playerName" element={<PlayerDetail />} />
              <Route path="/protected" element={<Protected />} />
            </Route>
            <Route path="*" element={<h1>Page does not exist for now </h1>} />
          </Routes>
        </AuthProvider>
      </Router>
    </main>
  );
}

export default App;
