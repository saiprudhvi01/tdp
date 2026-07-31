import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, User } from 'lucide-react';

const AdminLogin = ({ setIsAdmin }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const username = formData.username.trim();
    const password = formData.password.trim();
    
    try {
      const response = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminData', JSON.stringify(data.admin));
        setIsAdmin(true);
        navigate('/admin/dashboard');
      } else {
        alert(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
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
    <div className="min-h-[calc(100vh-70px)] h-auto flex items-center justify-center px-4 py-3 sm:py-6 relative overflow-hidden">
      {/* Background image with opacity 50% */}
      <div className="absolute inset-0 z-0 -z-10">
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
        {/* Light overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/25"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-sm sm:max-w-md my-auto"
      >
        <div className="glass-card p-5 sm:p-7 md:p-8">
          {/* Logo */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg border-2 border-primary-yellow">
              <User className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-1 leading-tight">
              {t('adminPanel')}
            </h1>
            <p className="text-xs sm:text-sm text-gray-200">{t('pleaseLogin')}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-white mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="glass-input w-full text-black placeholder-gray-700 py-2 px-3 text-xs sm:text-sm"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-white mb-1">
                {t('password')}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="glass-input w-full text-black placeholder-gray-700 py-2 px-3 text-xs sm:text-sm"
                placeholder="••••••••"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn-primary w-full flex items-center justify-center space-x-2 py-2.5 sm:py-3 mt-2 text-xs sm:text-sm font-bold"
            >
              <span>{t('signIn')}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </form>

          {/* Switch to User Login */}
          <div className="mt-4 text-center">
            <p className="text-amber-200 text-xs sm:text-sm">
              సాధారణ పౌరుల లాగిన్? (Public User?){' '}
              <Link to="/user/login" className="text-primary-yellow font-extrabold hover:underline ml-1">
                యూజర్ లాగిన్ (User Login)
              </Link>
            </p>
          </div>

          {/* Info Card */}
          <div className="mt-4 pt-3 border-t border-primary-yellow/20 text-center">
            <div className="bg-primary-yellow/90 rounded-lg p-2 border border-primary-yellow text-black text-[11px] sm:text-xs">
              <span className="font-bold">Demo Credentials:</span> Username: <span className="font-mono font-extrabold">admin</span> | Password: <span className="font-mono font-extrabold">admin123</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
