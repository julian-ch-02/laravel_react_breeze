import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "pages/dashboard";
import Login from "pages/login";

function App() {
  return (
    <div className="antialiased">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
