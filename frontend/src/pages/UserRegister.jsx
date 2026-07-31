import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';

const UserRegister = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/auth/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        navigate('/user/dashboard');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Server error. Please try again.');
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

      {/* Main Register Box - Matching Login Box Styling Exactly */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] mx-auto my-auto overflow-hidden"
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
              Create Account
            </h1>
            <p className="text-[11px] sm:text-xs font-medium text-gray-500 mt-0.5">
              Fill in your details to get started
            </p>
            
            {/* Yellow Dot Divider */}
            <div className="flex items-center justify-center gap-2 mt-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F5BE18]" />
            </div>
          </div>

          {/* Form - 2x2 Grid for compact viewport fit */}
          <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
              {/* Full Name Field */}
              <div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 focus-within:border-[#F5BE18] focus-within:ring-2 focus-within:ring-[#F5BE18]/20 bg-white transition-all shadow-sm">
                  <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full text-xs text-gray-800 placeholder-gray-400 outline-none bg-transparent font-medium"
                    placeholder="Full Name"
                  />
                </div>
              </div>

              {/* Email Address Field */}
              <div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 focus-within:border-[#F5BE18] focus-within:ring-2 focus-within:ring-[#F5BE18]/20 bg-white transition-all shadow-sm">
                  <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full text-xs text-gray-800 placeholder-gray-400 outline-none bg-transparent font-medium"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
              {/* Phone Number Field */}
              <div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 focus-within:border-[#F5BE18] focus-within:ring-2 focus-within:ring-[#F5BE18]/20 bg-white transition-all shadow-sm">
                  <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full text-xs text-gray-800 placeholder-gray-400 outline-none bg-transparent font-medium"
                    placeholder="Phone Number"
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
                    className="w-full text-xs text-gray-800 placeholder-gray-400 outline-none bg-transparent font-medium"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-[#F5BE18] hover:bg-[#E5AF00] text-white font-extrabold text-xs sm:text-sm rounded-xl py-2.5 shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer mt-2"
            >
              Register
            </button>
          </form>

          {/* Bottom Divider & Link */}
          <div className="flex items-center my-2.5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-2 text-[11px] text-gray-400 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="text-center text-[11px] sm:text-xs text-gray-600 font-medium">
            Already have an account?{' '}
            <Link to="/user/login" className="text-[#E5A000] font-extrabold hover:underline ml-0.5">
              Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserRegister;
