import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, User } from 'lucide-react';

const UserRegister = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
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
    <div className="min-h-[calc(100vh-70px)] h-auto flex items-center justify-center px-3 py-2 sm:py-4 relative overflow-hidden">
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
        className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg my-auto"
      >
        <div className="glass-card p-4 sm:p-5 md:p-6">
          {/* Header */}
          <div className="text-center mb-2.5 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-1 shadow-lg border-2 border-primary-yellow">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </div>
            <h1 className="text-lg sm:text-2xl font-extrabold text-white mb-0.5 leading-tight">
              {t('register')}
            </h1>
            <p className="text-[11px] sm:text-xs text-gray-200">{t('pleaseLogin')}</p>
          </div>

          {/* Form - Compact 2-column grid layout for 4 fields */}
          <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-white mb-0.5">
                  {t('name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="glass-input w-full text-black placeholder-gray-700 py-1.5 px-2.5 text-xs"
                  placeholder="Full Name"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-white mb-0.5">
                  {t('email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="glass-input w-full text-black placeholder-gray-700 py-1.5 px-2.5 text-xs"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-white mb-0.5">
                  {t('phone')}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="glass-input w-full text-black placeholder-gray-700 py-1.5 px-2.5 text-xs"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-white mb-0.5">
                  {t('password')}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="glass-input w-full text-black placeholder-gray-700 py-1.5 px-2.5 text-xs"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn-primary w-full flex items-center justify-center space-x-2 py-2 sm:py-2.5 mt-2.5 text-xs sm:text-sm font-bold"
            >
              <span>{t('signUp')}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </form>

          {/* Login Link */}
          <div className="mt-2.5 sm:mt-3 text-center">
            <p className="text-xs text-white">
              {t('alreadyHaveAccount')}{' '}
              <Link to="/user/login" className="text-primary-yellow font-extrabold hover:underline ml-1">
                {t('signIn')}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserRegister;
