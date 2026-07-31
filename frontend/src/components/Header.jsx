import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, ListOrdered, User, LogOut, LayoutDashboard, Home, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ isAdmin, isUser, setIsAdmin, setIsUser }) => {
  const { t, toggleLanguage, language } = useLanguage();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-black/90 backdrop-blur-md border-b border-amber-500/20 sticky top-0 z-50 text-white shadow-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Logo and Name */}
          <Link to="/" className="flex items-center space-x-3 group">
            {/* TDP Logo Badge */}
            <img 
              src="/bgimages/tdplogo.png" 
              alt="TDP Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain rounded-full shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300"
            />

            {/* Title & Red Constituency Subtitle */}
            <div className="min-w-0 flex-1">
              <h1 className="text-xs sm:text-base md:text-xl font-bold tracking-tight text-white leading-tight truncate max-w-[160px] sm:max-w-none">
                {t('mlaName') || 'దామచర్ల జనార్దన రావు'}
              </h1>
              <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-red-500 tracking-wide truncate max-w-[150px] sm:max-w-none">
                {t('constituency') || 'MLA-Ongole constituency'}
              </p>
            </div>
          </Link>

          {/* Right: Actions and Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-5">
            
            {/* Dashboard Link (Admin / User) */}
            {(isAdmin || isUser) && (
              <Link
                to={isAdmin ? '/admin/dashboard' : '/user/dashboard'}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 rounded-lg text-sm font-medium transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>{t('dashboard')}</span>
              </Link>
            )}

            {/* User Badge */}
            {(isAdmin || isUser) && (
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-white/10 rounded-lg text-sm font-medium">
                <User className="w-4 h-4 text-amber-400" />
                <span>{isAdmin ? 'Admin' : 'User'}</span>
              </div>
            )}

            {/* Logout Button */}
            {(isAdmin || isUser) && (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>{t('logout')}</span>
              </button>
            )}

            {/* Separator Divider */}
            <div className="h-6 w-px bg-white/20" />

            {/* Home Link */}
            <Link
              to="/"
              className="flex items-center space-x-2 text-white hover:text-amber-400 font-semibold text-sm transition-colors group"
            >
              <Home className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>{t('home') || 'హోమ్'}</span>
            </Link>

            {/* Separator Divider */}
            <div className="h-6 w-px bg-white/20" />

            {/* Status Link */}
            <Link
              to="/status"
              className="flex items-center space-x-2 text-white hover:text-amber-400 font-semibold text-sm transition-colors group"
            >
              <ListOrdered className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>{t('status') || 'స్టేటస్'}</span>
            </Link>

            {/* Separator Divider */}
            <div className="h-6 w-px bg-white/20" />

            {/* Schedules Link */}
            <Link
              to="/schedules"
              className="flex items-center space-x-2 text-white hover:text-amber-400 font-semibold text-sm transition-colors group"
            >
              <Calendar className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>{t('schedules') || 'షెడ్యూల్'}</span>
            </Link>

            {/* Separator Divider */}
            <div className="h-6 w-px bg-white/20" />

            {/* Language Capsule Switcher */}
            <div className="border border-white/20 bg-black/50 rounded-full p-1 flex items-center">
              <button
                onClick={() => language !== 'te' && toggleLanguage()}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                  language === 'te'
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                తెలుగు
              </button>
              <button
                onClick={() => language !== 'en' && toggleLanguage()}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                  language === 'en'
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Language Switcher for Mobile */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 bg-amber-400 text-black text-xs font-bold rounded-md"
            >
              {language === 'en' ? 'తెలుగు' : 'EN'}
            </button>
            {/* Hamburger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-amber-400 p-1 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/95 border-b border-amber-500/20 px-4 py-4 space-y-2 shadow-xl absolute top-full left-0 w-full"
        >
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center space-x-3 text-white hover:text-amber-400 font-semibold p-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Home className="w-5 h-5 text-amber-400" />
            <span>{t('home') || 'హోమ్'}</span>
          </Link>
          <Link
            to="/status"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center space-x-3 text-white hover:text-amber-400 font-semibold p-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <ListOrdered className="w-5 h-5 text-amber-400" />
            <span>{t('status') || 'స్టేటస్'}</span>
          </Link>
          <Link
            to="/schedules"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center space-x-3 text-white hover:text-amber-400 font-semibold p-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Calendar className="w-5 h-5 text-amber-400" />
            <span>{t('schedules') || 'షెడ్యూల్'}</span>
          </Link>

          {(isAdmin || isUser) && (
            <>
              <div className="h-px bg-white/10 my-2" />
              <Link
                to={isAdmin ? '/admin/dashboard' : '/user/dashboard'}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 text-amber-400 font-semibold p-3 rounded-lg hover:bg-amber-400/10 transition-colors"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>{t('dashboard')}</span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-3 text-red-400 hover:text-red-300 font-semibold p-3 rounded-lg hover:bg-red-500/10 w-full text-left transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>{t('logout')}</span>
              </button>
            </>
          )}
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;