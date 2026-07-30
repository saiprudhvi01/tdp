import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Bike, Calendar, FileText, Globe, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ isAdmin, isUser, setIsAdmin, setIsUser }) => {
  const { t, toggleLanguage, language } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (isAdmin) {
      localStorage.removeItem('adminToken');
      setIsAdmin(false);
    } else if (isUser) {
      localStorage.removeItem('userToken');
      setIsUser(false);
    }
    navigate('/');
  };

  const navItems = [
    { icon: Bike, label: t('home'), path: '/' },
    { icon: Calendar, label: t('schedules'), path: '/schedules' },
    { icon: FileText, label: t('status'), path: '/status' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Name */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-yellow rounded-full flex items-center justify-center shadow-lg">
              <Bike className="w-6 h-6 md:w-7 md:h-7 text-text-primary" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-text-primary">
                {t('mlaName')}
              </h1>
              <p className="text-xs md:text-sm text-text-secondary">
                {t('constituency')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-2 text-text-secondary hover:text-primary-yellow transition-colors duration-300 group"
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Dashboard Link */}
            {(isAdmin || isUser) && (
              <Link
                to={isAdmin ? '/admin/dashboard' : '/user/dashboard'}
                className="hidden md:flex items-center space-x-2 px-3 py-2 bg-primary-yellow/10 hover:bg-primary-yellow/20 rounded-xl transition-all duration-300"
              >
                <LayoutDashboard className="w-4 h-4 text-primary-yellow" />
                <span className="text-sm font-semibold text-text-primary">
                  {t('dashboard')}
                </span>
              </Link>
            )}

            {/* User Info */}
            {(isAdmin || isUser) && (
              <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-white/50 rounded-xl">
                <div className="w-8 h-8 bg-primary-yellow rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-text-primary" />
                </div>
                <span className="text-sm font-medium text-text-primary">
                  {isAdmin ? 'Admin' : 'User'}
                </span>
              </div>
            )}

            {/* Logout Button */}
            {(isAdmin || isUser) && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="hidden md:flex items-center space-x-2 px-3 py-2 bg-red-100 hover:bg-red-200 rounded-xl transition-all duration-300"
              >
                <LogOut className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold text-red-600">
                  {t('logout')}
                </span>
              </motion.button>
            )}

            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 md:px-4 md:py-2 bg-primary-yellow/10 hover:bg-primary-yellow/20 rounded-xl transition-all duration-300"
            >
              <Globe className="w-4 h-4 md:w-5 md:h-5 text-primary-yellow" />
              <span className="text-sm md:text-base font-semibold text-text-primary">
                {language === 'en' ? 'తెలుగు' : 'English'}
              </span>
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-text-primary" />
              ) : (
                <Menu className="w-6 h-6 text-text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-gray-200"
            >
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-primary-yellow/10 transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-primary-yellow" />
                    <span className="font-medium text-text-primary">{item.label}</span>
                  </Link>
                ))}
                {(isAdmin || isUser) && (
                  <>
                    <Link
                      to={isAdmin ? '/admin/dashboard' : '/user/dashboard'}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-primary-yellow/10 transition-colors"
                    >
                      <LayoutDashboard className="w-5 h-5 text-primary-yellow" />
                      <span className="font-medium text-text-primary">{t('dashboard')}</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-100 transition-colors"
                    >
                      <LogOut className="w-5 h-5 text-red-600" />
                      <span className="font-medium text-red-600">{t('logout')}</span>
                    </button>
                  </>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quotes Bar */}
      <div className="bg-primary-yellow/20 border-y border-primary-yellow/30 py-2">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm md:text-base font-medium text-text-primary">
            {t('quote1')} • {t('quote2')}
          </p>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
