import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Schedules from './pages/Schedules';
import Status from './pages/Status';
import FloatingChat from './components/FloatingChat';
import { useState, useEffect } from 'react';

function App() {
  const [isAdmin, setIsAdmin] = useState(() => !!localStorage.getItem('adminToken'));
  const [isUser, setIsUser] = useState(() => !!localStorage.getItem('userToken'));

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('adminToken'));
    setIsUser(!!localStorage.getItem('userToken'));
  }, []);

  const checkAdminAuth = () => isAdmin || !!localStorage.getItem('adminToken');
  const checkUserAuth = () => isUser || !!localStorage.getItem('userToken');

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen">
          <Header
            isAdmin={isAdmin}
            isUser={isUser}
            setIsAdmin={setIsAdmin}
            setIsUser={setIsUser}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedules" element={<Schedules isAdmin={isAdmin} />} />
            <Route path="/status" element={<Status isAdmin={isAdmin} isUser={isUser} />} />
            <Route path="/user/login" element={<UserLogin setIsUser={setIsUser} setIsAdmin={setIsAdmin} />} />
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/admin/login" element={<AdminLogin setIsAdmin={setIsAdmin} setIsUser={setIsUser} />} />
            <Route
              path="/admin/dashboard"
              element={checkAdminAuth() ? <AdminDashboard setIsAdmin={setIsAdmin} /> : <Navigate to="/admin/login" replace />}
            />
            <Route
              path="/user/dashboard"
              element={checkUserAuth() ? <UserDashboard setIsUser={setIsUser} /> : <Navigate to="/user/login" replace />}
            />
          </Routes>
          <FloatingChat isAdmin={isAdmin} isUser={isUser} />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
