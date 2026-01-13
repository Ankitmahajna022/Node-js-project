import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";
import Navbar from "./pages/Navbar";

function AppContent() {
  const location = useLocation();

  const showNavbar =
    location.pathname === "/signin" ||
    location.pathname === "/signup";

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
