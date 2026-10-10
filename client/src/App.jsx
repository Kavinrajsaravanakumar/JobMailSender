
import Loginpage from "./pages/Loginpage";
import { Routes, Route } from 'react-router-dom'
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from "./ProtectedRoute";
import InvalidUrl from "./pages/InvalidUrl"
import Emailsend from "./pages/Emailsend";


function App() {

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>}
        />
        <Route path="/email"
          element={
            <ProtectedRoute>
              <Emailsend />
            </ProtectedRoute>}
        />
        <Route path="*" element={<InvalidUrl />} />
      </Routes>
    </>
  )
}

export default App
