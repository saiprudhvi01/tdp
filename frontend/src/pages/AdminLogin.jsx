import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, User } from 'lucide-react';

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
    <div className="h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0 -z-10">
        <div 
          className="absolute inset-0 bg-cover bg-center blur-sm"
          style={{ 
            backgroundImage: "url('/bgimages/login.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'contrast(0.8) brightness(0.9)'
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
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-card p-8 md:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-2 border-primary-yellow">
              <User className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {t('adminPanel')}
            </h1>
            <p className="text-white">{t('pleaseLogin')}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="glass-input w-full text-black placeholder-gray-700"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                {t('password')}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="glass-input w-full text-black placeholder-gray-700"
                placeholder="••••••••"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <span>{t('signIn')}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>

          {/* Quotes */}
          <div className="mt-8 pt-6 border-t border-primary-yellow/20 text-center">
            <p className="text-sm text-white italic mb-2">
              {t('quote1')}
            </p>
            <div className="bg-primary-yellow rounded-lg p-3 mt-2 border-2 border-primary-yellow">
              <p className="text-xs text-black">
                <span className="font-medium">Demo Credentials:</span><br />
                Username: <span className="font-mono">admin</span><br />
                Password: <span className="font-mono">admin123</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
