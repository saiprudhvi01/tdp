import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingChat = ({ isAdmin, isUser }) => {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(true);

  const handleClick = (e) => {
    if (e) {
      e.stopPropagation();
    }
    const adminAuth = isAdmin || !!localStorage.getItem('adminToken');
    const userAuth = isUser || !!localStorage.getItem('userToken');

    if (adminAuth) {
      navigate('/admin/dashboard');
    } else if (userAuth) {
      navigate('/user/dashboard');
    } else {
      navigate('/user/login');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex items-end gap-2 sm:gap-3 pointer-events-auto">
      {/* Tooltip Popup Bubble */}
      {showTooltip && (
        <div 
          onClick={handleClick}
          className="relative bg-white text-gray-900 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 px-3 sm:px-4 shadow-2xl border border-gray-200 text-[11px] sm:text-xs font-medium max-w-[160px] sm:max-w-[200px] cursor-pointer hover:scale-105 transition-transform"
        >
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute -top-2 -left-2 bg-gray-200 hover:bg-gray-300 rounded-full p-0.5 text-gray-600 cursor-pointer z-10"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="font-bold text-gray-800">మీ సమస్యకు మేమున్నాం</p>
          <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5">ఇప్పుడే ఫిర్యాదు నమోదు చేయండి.</p>
          
          {/* Pointer Tail */}
          <div className="absolute -right-[13px] bottom-4">
            <svg width="20" height="30" viewBox="0 0 20 30" fill="white">
              <path d="M0 0 L20 15 L0 30 Z" />
            </svg>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <motion.button
        type="button"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-[#F4B400] to-[#FFD54F] rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(244,180,0,0.5),0_0_50px_rgba(244,180,0,0.3)] border-2 sm:border-4 border-white transition-transform relative cursor-pointer"
      >
        <span className="absolute top-0 right-0 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-red-600 border-2 border-white rounded-full" />
        <MessageCircle className="w-5 h-5 sm:w-7 sm:h-7 text-black fill-black" />
      </motion.button>
    </div>
  );
};

export default FloatingChat;
