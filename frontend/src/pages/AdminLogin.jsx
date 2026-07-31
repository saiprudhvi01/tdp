import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

const AdminLogin = ({ setIsAdmin, setIsUser }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loginAs, setLoginAs] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });

  useEffect(() => {
    if (localStorage.getItem('adminToken')) {
      if (setIsAdmin) setIsAdmin(true);
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate, setIsAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const identifier = formData.identifier.trim();
    const password = formData.password.trim();

    if (loginAs === 'admin') {
      try {
        const response = await fetch('/api/auth/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: identifier, password }),
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('adminToken', data.token);
          localStorage.setItem('adminData', JSON.stringify(data.admin));
          if (setIsAdmin) setIsAdmin(true);
          navigate('/admin/dashboard', { replace: true });
        } else {
          alert(data.message || 'Invalid admin credentials');
        }
      } catch (error) {
        console.error('Admin login error:', error);
        alert('Server error. Please try again.');
      }
    } else {
      try {
        const response = await fetch('/api/auth/user/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: identifier, password }),
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('userToken', data.token);
          localStorage.setItem('userData', JSON.stringify(data.user));
          if (setIsUser) setIsUser(true);
          navigate('/user/dashboard', { replace: true });
        } else {
          alert(data.message || 'Invalid user credentials');
        }
      } catch (error) {
        console.error('User login error:', error);
        alert('Server error. Please try again.');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="h-[calc(100vh-70px)] max-h-[calc(100vh-70px)] w-full flex items-center justify-center px-4 overflow-hidden relative">
      {/* Background image with 50% opacity */}
      <div className="absolute inset-0 z-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm opacity-50"
          style={{
            backgroundImage: "url('/bgimages/login.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'contrast(0.8) brightness(0.9)',
            opacity: 0.5
          }}
        ></div>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/25" />
      </div>

      {/* Main Login Card Box - Perfectly Centered Up and Down */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-[340px] sm:max-w-[390px] mx-auto my-auto overflow-hidden"
      >
        <div className="bg-white rounded-[24px] shadow-2xl p-4 sm:p-6 border border-amber-100/60">
          
          {/* Top TDP Emblem */}
          <div className="flex justify-center mb-1.5 sm:mb-2">
            <img
              src="/bgimages/tdplogo.png"
              alt="TDP Symbol"
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain drop-shadow-md"
            />
          </div>

          {/* Header Title & Subtitle */}
          <div className="text-center mb-2.5 sm:mb-3">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#111111] leading-tight">
              Admin Portal
            </h1>
            <p className="text-[11px] sm:text-xs font-medium text-gray-500 mt-0.5">
              Login to access admin panel
            </p>
            
            {/* Yellow Dot Divider */}
            <div className="flex items-center justify-center gap-2 mt-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F5BE18]" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-2.5">
            {/* Username or Email Field */}
            <div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 focus-within:border-[#F5BE18] focus-within:ring-2 focus-within:ring-[#F5BE18]/20 bg-white transition-all shadow-sm">
                <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  required
                  className="w-full text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent font-medium"
                  placeholder="Username or Email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 focus-within:border-[#F5BE18] focus-within:ring-2 focus-within:ring-[#F5BE18]/20 bg-white transition-all shadow-sm">
                <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent font-medium"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right mt-1">
                <button
                  type="button"
                  onClick={() => alert('దయచేసి పాస్‌వర్డ్ రీసెట్ కోసం కార్యాలయాన్ని సంప్రదించండి.')}
                  className="text-[11px] font-bold text-[#E5A000] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Login as Radio Selector Box */}
            <div className="bg-[#F8F9FA] rounded-xl p-2 sm:p-2.5 border border-gray-200/80 flex items-center justify-between mt-1">
              <span className="text-[11px] sm:text-xs font-bold text-gray-700">Login as</span>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1 cursor-pointer text-xs font-semibold text-gray-800">
                  <input
                    type="checkbox"
                    checked={loginAs === 'user'}
                    onChange={() => {
                      setLoginAs('user');
                      navigate('/user/login');
                    }}
                    className="w-3.5 h-3.5 rounded text-[#F5BE18] focus:ring-[#F5BE18] accent-[#F5BE18] cursor-pointer"
                  />
                  <span>User</span>
                </label>

                <label className="flex items-center gap-1 cursor-pointer text-xs font-semibold text-gray-800">
                  <input
                    type="checkbox"
                    checked={loginAs === 'admin'}
                    onChange={() => setLoginAs('admin')}
                    className="w-3.5 h-3.5 rounded text-[#F5BE18] focus:ring-[#F5BE18] accent-[#F5BE18] cursor-pointer"
                  />
                  <span>Admin</span>
                </label>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#F5BE18] hover:bg-[#E5AF00] text-white font-extrabold text-xs sm:text-sm rounded-xl py-2.5 shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer mt-2"
            >
              Login
            </button>
          </form>

          {/* Bottom Divider & Link */}
          <div className="flex items-center my-2.5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-2 text-[11px] text-gray-400 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="text-center text-[11px] sm:text-xs text-gray-600 font-medium">
            Don't have an account?{' '}
            <Link to="/user/register" className="text-[#E5A000] font-extrabold hover:underline ml-0.5">
              Contact Administrator
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
